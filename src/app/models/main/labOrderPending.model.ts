export class LabOrderPendingModel{
    id: number;
    price: number;
    quantity: number;
    discount: number;
    total: number;
    state: number;
    createdAt: string;
    updatedAt: string;
    tariff: {
        id: number;
        name: string;
        description: string;
        price_sol: number;
        price_usd: number;
        odontograma: false;
        state: number;
        createdAt: string;
        updatedAt: string;
    }
    quotation: {
        id: number;
        date: string;
        subtotal: number;
        tax: number;
        discount: number;
        total: number;
        state: number;
        createdAt: string;
        updatedAt: string;
        clinicHistory: {
            id: number;
            date: string;
            client: number;
            name: string;
            lastNameFather: string;
            lastNameMother: string;
            documentNumber: string;
            relationship: string;
            birthdate: string;
            history: string;
            sex: string;
            ruc: string;
            address: string;
            country: string;
            email: string;
            phone: string;
            cellphone: number;
            studyCenter: string;
            knowledge: string;
            referred: string;
            placeOrigen: string;
            birthPlace: string;
            vip: boolean;
            previousAttentions: string;
            state: number;
            createdAt: string;
            updatedAt: string;
        }
    }
    
}