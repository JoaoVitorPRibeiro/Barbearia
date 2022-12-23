import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointment-repository";

interface CreateAppointmentRequest { //O meu request tem que ter um cliente, horario de inicio e horario de término
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

type CreateAppointmentResponse = Appointment //A resposta do meu request, é um agendamento (Appointment)

export class CreateAppointment {
   constructor(
    private appointmentsRepository: AppointmentsRepository
   ) {}
   
    async execute({
        customer,
        startsAt,
        endsAt,
    }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
       const overLappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
       )

       if(overLappingAppointment) {
        throw new Error('Another appointment overlaps this appointments dates')
       }

        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt,
        })

        await this.appointmentsRepository.create(appointment)
        
        return appointment
    }
}