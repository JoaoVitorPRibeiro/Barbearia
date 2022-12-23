import {expect, test} from "vitest"
import { getFutureDate } from "../tests/utils/get-future-date"
import { Appointment } from "./appointment"

test('create an appointment', () => { //To criando um agendamento
    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-11')
    
    const appointment = new Appointment({
        customer:'Fulano',
        startsAt,
        endsAt,
    })

    expect(appointment).toBeInstanceOf(Appointment) //Testando se o appointment que eu criei esta atendendo ass condições
    expect(appointment.customer).toEqual('Fulano') //Testando se ele vai retornar o cliente "fulano"
})

test('cannot create an appointment with end date before start date', () =>{ //Criando um teste para validar que o horario de término, não pode ser antes do horario de inicio
const startsAt = getFutureDate('2022-08-10')
const endsAt = getFutureDate('2022-08-09')

expect(() => {
    return new Appointment({
        customer:'Fulano',
        startsAt,
        endsAt,
    })
}).toThrow()
})


test('cannot create an appointment with start date before noww', () =>{ //Criando um teste para validar que o horario de inicio, não pode ser anterior ao hoje

    const startsAt = new Date() //To criando uma data de inicio hoje (ele pega o hoje)
    const endsAt = new Date() //

    startsAt.setDate(startsAt.getDate() - 1)
    endsAt.setDate(endsAt.getDate() + 3) 

expect(() => {
    return new Appointment({
        customer:'Fulano',
        startsAt,
        endsAt,
    })
}).toThrow()
})