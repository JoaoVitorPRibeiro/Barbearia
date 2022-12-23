import {areIntervalsOverlapping} from 'date-fns'

import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointment-repository";

export class InMemoryAppointmentRepository implements AppointmentsRepository {
    public items: Appointment[] = [] //AQUI EU TO 'CRIANDO' UM BANCO DE DADOS FALSO, UM ARRAY VAZIO
     
    async create(appointment: Appointment): Promise<void> {
        this.items.push(appointment) //CRIANDO UM AGENDAMENTO E JOGANDO NO ARRAY VAZIO
    }
    async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        const overLappingAppointment = this.items.find(appointment => { //AQUI EU TO CORRENDO O ARRAY DO BANCO DE DADOS, PARA VER SE JA TEM UM AGENDAMENTO COM ESSE HORARIO
            return areIntervalsOverlapping(
                { start: startsAt, end: endsAt},
                { start: appointment.startsAt, end: appointment.endsAt},
                {inclusive:true}
            )
        })

        if(!overLappingAppointment) { //CASO NÃO TENHA, VAI RETORNAR NULL
            return null
        }
        return overLappingAppointment //CASO TENHA, ELE VAI RETORNAR O AGENDAMENTO
    }
}