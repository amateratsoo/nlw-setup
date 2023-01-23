import { FastifyInstance, FastifyRequest } from 'fastify';
import dayjs from 'dayjs';
import { prisma } from './libs/prisma';

interface CreateHabitBody {
  title: string;
  weekDays: number[];
};

interface GetDayQuery {
  date: string;
}

interface ToggleHabitsParams {
  id: string;
}

async function routes(fastify: FastifyInstance) {
  fastify.get('/all', async (_, response) => {
    const data = await prisma.habit.findMany();

    response
      .status(200)
      .send({ data });
  })

  fastify.post('/habits', async (request: FastifyRequest<{ Body: CreateHabitBody }>, response) => {
    const today = dayjs().startOf('day').toDate();
    const { title, weekDays } = request.body;

    const data = await prisma.habit.create({
      data: {
        title,
        createdAt: today,
        HabitWeekDays: {
          create: weekDays.map(weekDay => {
            return {
              weekDay
            }
          })
        }
      }
    });

    response
      .status(200)
      .send({ data });
  })

  fastify.get('/day', async (request: FastifyRequest<{ Querystring: GetDayQuery }>, response) => {
    const { date } = request.query;
    const parsedDate = new Date(date);
    const parsedDay = dayjs(parsedDate).get('day');

    const possibleHabits = await prisma.habit.findMany({
      where: {
        createdAt: {
          lte: parsedDate
        },

        HabitWeekDays: {
          some: {
            weekDay: parsedDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate
      },

      include: {
        DayHabit: true
      }
    })

    const completedHabits = day?.DayHabit.map(dayHabit => {
      return dayHabit.habitId
    });
    
    response
      .status(200)
      .send({ possibleHabits, completedHabits });
  })

  fastify.patch('/habits/:id/toggle', async (request: FastifyRequest<{ Params: ToggleHabitsParams }>, response) => {
    const { id } = request.params;

    const today = dayjs().startOf('day').toDate();
    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        dayId_habitId: {
          dayId: day.id,
          habitId: id
        }
      }
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })
    }

    else {
      await prisma.dayHabit.create({
        data: {
          dayId: day.id,
          habitId: id
        }
      })
    }
  })

  fastify.get('/summary', async (_, response) => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM days_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date / 1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `

    return summary;
  })
}

export { routes };
