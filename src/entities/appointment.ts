export interface AppointmentProps {
customer: string;
startsAt: Date;
endsAt: Date;
    
}

export class Appointment {
    private props: AppointmentProps

    get customer () { //To pegando os dados de customers no appointmentprops
        return this.props.customer
    }
    
    get startsAt () { //To pegando os dados de startsAt no appointmentprops
        return this.props.startsAt
    }
    get endsAt () { //To pegando os dados de endsAt no appointmentprops
        return this.props.endsAt
    }

    constructor(props: AppointmentProps) { //Criando uma nova classe
        const { startsAt, endsAt} = props 

        if( startsAt <= new Date()) {
            throw new Error('Invalid start date')
        }

        if( endsAt <= startsAt) { //Se a data de término for anterior a data de inicio, vai dar erro
            throw Error('Invalid end date')
        }
        
        
        this.props = props
    }
}