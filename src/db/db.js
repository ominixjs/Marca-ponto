// DB temporário. usar Mysql e Sequelize
export const db = [
    {
        id: "875t0s46oqq6",
        name: "Loja",
        logo: "",
        hostname: "loja.ponto.com.br",
        collaborators: [
            {
                id: 1,
                name: "Ana Beatriz Lima",
                birthday: "1995-04-12",
                email: "ana.lima@email.com",
                password: "ana12345",
                cpf: "123.456.789-00",
                pis: "123.45678.90-1",
                nationality: "Brasileira",
                photo: "uploads/users/new_user.png",
                address: {
                    street: "Rua das Flores",
                    number: "123",
                    district: "Centro",
                    city: "Salvador",
                    state: "BA",
                    zipCode: "40000-000",
                },
                pointSheet: [
                    {
                        date: "11/04/2026",
                        timeSheet: [
                            "08:01:10",
                            "12:02:30",
                            "13:01:15",
                            "17:10:20",
                        ],
                    },
                    {
                        date: "12/04/2026",
                        timeSheet: [
                            "08:00:05",
                            "12:00:40",
                            "13:02:00",
                            "17:12:45",
                        ],
                    },
                    {
                        date: "13/04/2026",
                        timeSheet: [
                            "07:59:50",
                            "12:03:10",
                            "13:00:30",
                            "17:08:10",
                        ],
                    },
                    {
                        date: "14/04/2026",
                        timeSheet: [
                            "08:02:20",
                            "12:01:00",
                            "13:03:25",
                            "17:15:00",
                        ],
                    },
                    {
                        date: "15/04/2026",
                        timeSheet: [
                            "08:00:00",
                            "12:00:00",
                            "13:00:00",
                            "17:05:30",
                        ],
                    },
                    {
                        date: "16/04/2026",
                        timeSheet: [
                            "08:03:15",
                            "12:04:20",
                            "13:02:40",
                            "17:20:10",
                        ],
                    },
                    {
                        date: "17/04/2026",
                        timeSheet: [
                            "08:01:00",
                            "12:01:50",
                            "13:01:10",
                            "17:18:25",
                        ],
                    },
                    {
                        date: "24/04/2026",
                        timeSheet: [
                            "08:01:00",
                            "12:01:50",
                            "13:01:10",
                            "17:18:25",
                        ],
                    },
                ],
            },
            {
                id: 2,
                name: "Carlos Eduardo Martins",
                birthday: "1989-09-21",
                email: "carlos.martins@email.com",
                password: "carlose89",
                cpf: "987.654.321-00",
                pis: "987.65432.10-9",
                nationality: "Brasileira",
                photo: "uploads/users/new_user.png",
                address: {
                    street: "Av. Paulista",
                    number: "1500",
                    district: "Bela Vista",
                    city: "São Paulo",
                    state: "SP",
                    zipCode: "01310-200",
                },
                pointSheet: [
                    {
                        date: "11/04/2026",
                        timeSheet: [
                            "08:10:00",
                            "12:10:00",
                            "13:10:00",
                            "17:25:00",
                        ],
                    },
                    {
                        date: "12/04/2026",
                        timeSheet: [
                            "08:12:10",
                            "12:09:40",
                            "13:15:20",
                            "17:30:10",
                        ],
                    },
                    {
                        date: "13/04/2026",
                        timeSheet: [
                            "08:08:00",
                            "12:05:00",
                            "13:10:00",
                            "17:28:00",
                        ],
                    },
                    {
                        date: "14/04/2026",
                        timeSheet: [
                            "08:15:30",
                            "12:12:00",
                            "13:18:00",
                            "17:35:45",
                        ],
                    },
                    {
                        date: "15/04/2026",
                        timeSheet: [
                            "08:11:00",
                            "12:08:30",
                            "13:12:10",
                            "17:27:30",
                        ],
                    },
                    {
                        date: "16/04/2026",
                        timeSheet: [
                            "08:09:45",
                            "12:06:50",
                            "13:14:30",
                            "17:29:10",
                        ],
                    },
                    {
                        date: "17/04/2026",
                        timeSheet: [
                            "08:07:30",
                            "12:04:20",
                            "13:11:00",
                            "17:26:00",
                        ],
                    },
                ],
            },
            {
                id: 3,
                name: "Juliana Ferreira",
                birthday: "2001-01-30",
                email: "juliana.ferreira@email.com",
                password: "juli2001",
                cpf: "321.654.987-00",
                pis: "321.65498.70-5",
                nationality: "Brasileira",
                photo: "uploads/users/new_user.png",
                address: {
                    street: "Rua do Sol",
                    number: "45",
                    district: "Boa Viagem",
                    city: "Recife",
                    state: "PE",
                    zipCode: "51000-000",
                },
                pointSheet: [
                    {
                        date: "11/04/2026",
                        timeSheet: [
                            "08:05:00",
                            "12:00:00",
                            "13:00:00",
                            "17:15:00",
                        ],
                    },
                    {
                        date: "12/04/2026",
                        timeSheet: [
                            "08:04:30",
                            "12:02:00",
                            "13:01:00",
                            "17:18:20",
                        ],
                    },
                    {
                        date: "13/04/2026",
                        timeSheet: [
                            "08:06:10",
                            "12:03:10",
                            "13:00:30",
                            "17:20:00",
                        ],
                    },
                    {
                        date: "14/04/2026",
                        timeSheet: [
                            "08:03:00",
                            "12:01:30",
                            "13:02:20",
                            "17:17:45",
                        ],
                    },
                    {
                        date: "15/04/2026",
                        timeSheet: [
                            "08:02:40",
                            "12:00:50",
                            "13:00:00",
                            "17:16:10",
                        ],
                    },
                    {
                        date: "16/04/2026",
                        timeSheet: [
                            "08:05:55",
                            "12:04:00",
                            "13:03:30",
                            "17:22:00",
                        ],
                    },
                    {
                        date: "17/04/2026",
                        timeSheet: [
                            "08:01:20",
                            "12:02:10",
                            "13:01:40",
                            "17:19:00",
                        ],
                    },
                ],
            },
            {
                id: 4,
                name: "Rafael Costa",
                birthday: "1993-06-18",
                email: "rafael.costa@email.com",
                password: "rafa123",
                cpf: "456.123.789-00",
                pis: "456.12378.90-2",
                nationality: "Brasileira",
                photo: "uploads/users/new_user.png",
                address: {
                    street: "Rua Verde",
                    number: "78",
                    district: "Jardins",
                    city: "São Paulo",
                    state: "SP",
                    zipCode: "01400-000",
                },
                pointSheet: [
                    {
                        date: "11/04/2026",
                        timeSheet: [
                            "07:55:00",
                            "12:00:00",
                            "13:05:00",
                            "17:00:00",
                        ],
                    },
                    {
                        date: "12/04/2026",
                        timeSheet: [
                            "07:58:20",
                            "12:02:10",
                            "13:04:40",
                            "17:05:30",
                        ],
                    },
                    {
                        date: "13/04/2026",
                        timeSheet: [
                            "07:57:10",
                            "12:01:00",
                            "13:03:00",
                            "17:02:45",
                        ],
                    },
                    {
                        date: "14/04/2026",
                        timeSheet: [
                            "07:59:00",
                            "12:03:20",
                            "13:06:10",
                            "17:06:00",
                        ],
                    },
                    {
                        date: "15/04/2026",
                        timeSheet: [
                            "07:56:40",
                            "12:00:30",
                            "13:02:20",
                            "17:03:15",
                        ],
                    },
                    {
                        date: "16/04/2026",
                        timeSheet: [
                            "07:58:00",
                            "12:04:10",
                            "13:05:00",
                            "17:08:20",
                        ],
                    },
                    {
                        date: "17/04/2026",
                        timeSheet: [
                            "07:57:30",
                            "12:02:00",
                            "13:04:00",
                            "17:05:50",
                        ],
                    },
                ],
            },
            {
                id: 5,
                name: "Mariana Oliveira",
                birthday: "1998-11-05",
                email: "mariana.oliveira@email.com",
                password: "mariaoliver123",
                cpf: "159.753.486-00",
                pis: "159.75348.60-3",
                nationality: "Brasileira",
                photo: "uploads/users/new_user.png",
                address: {
                    street: "Av. Atlântica",
                    number: "900",
                    district: "Copacabana",
                    city: "Rio de Janeiro",
                    state: "RJ",
                    zipCode: "22010-000",
                },
                pointSheet: [
                    {
                        date: "11/04/2026",
                        timeSheet: [
                            "08:05:00",
                            "12:05:00",
                            "13:10:00",
                            "17:30:00",
                        ],
                    },
                    {
                        date: "12/04/2026",
                        timeSheet: [
                            "08:06:30",
                            "12:04:20",
                            "13:12:00",
                            "17:28:40",
                        ],
                    },
                    {
                        date: "13/04/2026",
                        timeSheet: [
                            "08:04:00",
                            "12:03:00",
                            "13:11:00",
                            "17:27:00",
                        ],
                    },
                    {
                        date: "14/04/2026",
                        timeSheet: [
                            "08:07:10",
                            "12:06:00",
                            "13:13:30",
                            "17:35:20",
                        ],
                    },
                    {
                        date: "15/04/2026",
                        timeSheet: [
                            "08:05:50",
                            "12:05:10",
                            "13:10:40",
                            "17:32:10",
                        ],
                    },
                    {
                        date: "16/04/2026",
                        timeSheet: [
                            "08:06:00",
                            "12:04:30",
                            "13:12:20",
                            "17:34:00",
                        ],
                    },
                    {
                        date: "17/04/2026",
                        timeSheet: [
                            "08:05:20",
                            "12:03:50",
                            "13:11:10",
                            "17:33:15",
                        ],
                    },
                ],
            },
        ],
    },
];
