// Dados dos clientes Ekobrazil
const clientsData = [
  {
    "nome": "ADJER HUGO SANTOS DE MELO",
    "telefone": "(84) 99634-8967",
    "data": "10/11/2023"
  },
  {
    "nome": "ADRIANA DE FATIMA SILVEIRA",
    "telefone": "(41) 98405-9870",
    "data": "22/04/2024"
  },
  {
    "nome": "Luciana Fogaça Albuquerque",
    "telefone": "(51) 98218-6434",
    "data": "13/08/2025"
  },
  {
    "nome": "Ricardo Morizono",
    "telefone": "(11) 98111-0486",
    "data": "19/08/2025"
  },
  {
    "nome": "Lucia Bossi de Almeida Parra",
    "telefone": "(31) 98447-8817",
    "data": "15/08/2025"
  },
  {
    "nome": "Marcio A R Oliveira",
    "telefone": "(11) 98664-0000",
    "data": "16/08/2025"
  },
  {
    "nome": "AGENOR ALBARA",
    "telefone": "(51) 98445-2378",
    "data": "04/08/2025"
  },
  {
    "nome": "ANDRE LUIS MACIEL LUMERTZ",
    "telefone": "(51) 98137-1818",
    "data": "15/04/2025"
  },
  {
    "nome": "ANDRE LUMERTZ",
    "telefone": "(51) 98137-1818",
    "data": "15/08/2024"
  },
  {
    "nome": "ANDRE LUMERTZ",
    "telefone": "(51) 98137-1818",
    "data": "19/06/2023"
  },
  {
    "nome": "ANNIE FERREIRA SCHNEIDER ",
    "telefone": "(51) 99887-7933",
    "data": "11/03/2024"
  },
  {
    "nome": "Adriana Costa Evaldt",
    "telefone": "(51) 98115-0057",
    "data": "22/08/2023"
  },
  {
    "nome": "Adriana Costa Torres Nascimento",
    "telefone": "(55) 99174-6329",
    "data": "12/06/2025"
  },
  {
    "nome": "Adriana Cristina de Freitas",
    "telefone": "(41) 98460-5562",
    "data": "05/09/2024"
  },
  {
    "nome": "Adriana da Silva Tarouco ",
    "telefone": "(51) 99844-5083",
    "data": "02/09/2023"
  },
  {
    "nome": "Agnaldo de Souza Batista",
    "telefone": "(41) 99923-8689",
    "data": "04/10/2023"
  },
  {
    "nome": "Alberto Pires Vaz",
    "telefone": "(22) 99729-9854",
    "data": "20/07/2025"
  },
  {
    "nome": "Alberto luiz leal da silva",
    "telefone": "(51) 99599-4530",
    "data": "01/07/2025"
  },
  {
    "nome": "Alessandro Paim",
    "telefone": "(51) 99999-4523",
    "data": "31/05/2023"
  },
  {
    "nome": "Alessandro Rose",
    "telefone": "(51) 99653-2649",
    "data": "31/05/2023"
  },
  {
    "nome": "Alessandro serao",
    "telefone": "(13) 97405-0129",
    "data": "10/02/2024"
  },
  {
    "nome": "Aline Dietrich Haas ",
    "telefone": "(54) 99189-9480",
    "data": "09/07/2023"
  },
  {
    "nome": "Allan Poe",
    "telefone": "(51) 99511-6131",
    "data": "26/07/2023"
  },
  {
    "nome": "Amanda da Costa Daguane ",
    "telefone": "(14) 99136-3260",
    "data": "10/06/2024"
  },
  {
    "nome": "Ana Carolina da Silva Conceição ",
    "telefone": "(11) 98623-6954",
    "data": "05/10/2023"
  },
  {
    "nome": "Ana Lucia Dourado",
    "telefone": "(45) 99953-4139",
    "data": "07/03/2023"
  },
  {
    "nome": "Ana Paula Bitencourt da Rocha ",
    "telefone": "(51) 98144-4167",
    "data": "26/02/2023"
  },
  {
    "nome": "Andrea Batazza Andrade",
    "telefone": "(11) 99901-5710",
    "data": "01/06/2025"
  },
  {
    "nome": "Andreia Delgado",
    "telefone": "(51) 98288-8128",
    "data": "18/06/2024"
  },
  {
    "nome": "Angela Cristina de Mello Gabriel ",
    "telefone": "(51) 99403-9731",
    "data": "09/02/2024"
  },
  {
    "nome": "Antônio Carlos Koch de Azambuja ",
    "telefone": "(51) 99976-3789",
    "data": "20/07/2025"
  },
  {
    "nome": "Antônio Marcos Soares ",
    "telefone": "(51) 98191-7225",
    "data": "16/10/2023"
  },
  {
    "nome": "Aparecido Resende Filho ",
    "telefone": "(11) 98983-8888",
    "data": "05/07/2024"
  },
  {
    "nome": "Ariel Augusto Leonhardt",
    "telefone": "(51) 99617-5138",
    "data": "05/01/2023"
  },
  {
    "nome": "Arthur Andrade da Silva",
    "telefone": "(51) 99386-7850",
    "data": "17/09/2024"
  },
  {
    "nome": "Astrid Müller ",
    "telefone": "(51) 99981-4675",
    "data": "23/09/2023"
  },
  {
    "nome": "Aurea Mayora ",
    "telefone": "(51) 99207-0115",
    "data": "02/03/2024"
  },
  {
    "nome": "BELONIR LUIZ BERNARDI",
    "telefone": "(47) 99982-0517",
    "data": "09/01/2023"
  },
  {
    "nome": "Bernardo Dornsbach Bandeira",
    "telefone": "(51) 99883-5720",
    "data": "25/07/2023"
  },
  {
    "nome": "Bernardo Malater Camara de Oliveira",
    "telefone": "(51) 99551-2003",
    "data": "13/08/2024"
  },
  {
    "nome": "Bianca Araujo dos Santos ",
    "telefone": "(47) 98843-3771",
    "data": "09/11/2023"
  },
  {
    "nome": "Bruna Alves dos Santos",
    "telefone": "(11) 99676-5272",
    "data": "18/03/2025"
  },
  {
    "nome": "Bruna Antoniazzi",
    "telefone": "(55) 99929-2220",
    "data": "07/03/2024"
  },
  {
    "nome": "Bruna Goulart",
    "telefone": "(48) 99661-4092",
    "data": "23/05/2023"
  },
  {
    "nome": "CARLA DE ANDRADE LABA",
    "telefone": "(51) 98131-0523",
    "data": "16/11/2024"
  },
  {
    "nome": "CARLOS EDUARDO BISPO",
    "telefone": "(51) 99515-1667",
    "data": "18/08/2023"
  },
  {
    "nome": "CASSANDRA NATALIA RAIMANN",
    "telefone": "(51) 98181-0442",
    "data": "28/01/2024"
  },
  {
    "nome": "CLARENI BRASIL DOS SANTOS DAVID",
    "telefone": "(51) 99196-2954",
    "data": "31/08/2023"
  },
  {
    "nome": "CLAUDIO CORREIA DE PAULA",
    "telefone": "(17) 99733-4943",
    "data": "19/10/2024"
  },
  {
    "nome": "Carla Daiane Lettnin Kickhofel ",
    "telefone": "(53) 99975-7495",
    "data": "23/05/2023"
  },
  {
    "nome": "Carolina Pizzinatto",
    "telefone": "(11) 99444-8864",
    "data": "27/07/2024"
  },
  {
    "nome": "Caroline polli da Silva Iasculski ",
    "telefone": "(51) 99234-3419",
    "data": "08/06/2025"
  },
  {
    "nome": "Catucia Nuncio",
    "telefone": "(54) 99603-5335",
    "data": "13/08/2025"
  },
  {
    "nome": "Celia Maria Diniz ",
    "telefone": "(16) 99264-8917",
    "data": "22/01/2024"
  },
  {
    "nome": "Celso Raul Machado ",
    "telefone": "(51) 99846-3745",
    "data": "21/10/2024"
  },
  {
    "nome": "Cibele Cardoso",
    "telefone": "(47) 99184-2303",
    "data": "02/12/2023"
  },
  {
    "nome": "Cintia Rothbarth",
    "telefone": "(47) 99289-1444",
    "data": "07/08/2025"
  },
  {
    "nome": "Cladia Quiotti ",
    "telefone": "(51) 98043-8343",
    "data": "04/06/2025"
  },
  {
    "nome": "Claire Luísa Kummer Eilert",
    "telefone": "(54) 99144-3322",
    "data": "09/06/2023"
  },
  {
    "nome": "Claudia Cristina Pereira ",
    "telefone": "(51) 99910-8626",
    "data": "03/03/2023"
  },
  {
    "nome": "Claudia Sofia de Pauli Siqueira",
    "telefone": "(41) 99974-1126",
    "data": "19/03/2025"
  },
  {
    "nome": "Cleusa Teresinha de Azevedo Mattos ",
    "telefone": "(51) 99366-5029",
    "data": "28/02/2023"
  },
  {
    "nome": "Cleusa pereira pinto ",
    "telefone": "(51) 98135-0312",
    "data": "25/10/2023"
  },
  {
    "nome": "Cleverson Salau de Lima",
    "telefone": "(51) 99998-1840",
    "data": "07/09/2024"
  },
  {
    "nome": "Cloris Regina Zatz",
    "telefone": "(51) 99666-6957",
    "data": "10/01/2024"
  },
  {
    "nome": "Cláudio Antônio ",
    "telefone": "(51) 98165-4856",
    "data": "11/11/2023"
  },
  {
    "nome": "Clóvis Farias",
    "telefone": "(53) 98413-4585",
    "data": "21/03/2025"
  },
  {
    "nome": "Cosme de santana santos ",
    "telefone": "(71) 98470-9174",
    "data": "03/10/2024"
  },
  {
    "nome": "Cristiane Galle",
    "telefone": "(51) 99915-0277",
    "data": "07/08/2025"
  },
  {
    "nome": "Cristina Bonorino",
    "telefone": "(51) 99996-5331",
    "data": "02/08/2024"
  },
  {
    "nome": "Cristina Pereira ",
    "telefone": "(51) 99534-7525",
    "data": "18/08/2023"
  },
  {
    "nome": "Cristóvão Oliveira da Fonseca ",
    "telefone": "(16) 99634-9503",
    "data": "21/08/2023"
  },
  {
    "nome": "DANIELE ROCHA FARIAS",
    "telefone": "(48) 99658-1292",
    "data": "17/02/2025"
  },
  {
    "nome": "DIEGO AGUIAR de oliveira",
    "telefone": "(15) 98801-1432",
    "data": "13/11/2023"
  },
  {
    "nome": "Daiane Porto Loregian",
    "telefone": "(51) 98947-9212",
    "data": "15/03/2023"
  },
  {
    "nome": "Daniel José Barth",
    "telefone": "(51) 98057-6087",
    "data": "15/05/2025"
  },
  {
    "nome": "Daniel José Barth",
    "telefone": "(51) 98057-6087",
    "data": "15/05/2025"
  },
  {
    "nome": "Daniel Rodighero",
    "telefone": "(54) 99155-8277",
    "data": "26/11/2024"
  },
  {
    "nome": "Daniela Schmitt",
    "telefone": "(54) 98131-4944",
    "data": "21/08/2023"
  },
  {
    "nome": "Daniela Tainá ",
    "telefone": "(51) 98135-0312",
    "data": "29/10/2023"
  },
  {
    "nome": "Daniela Tainá ",
    "telefone": "(51) 98135-0312",
    "data": "29/10/2023"
  },
  {
    "nome": "Daniele pavanello ",
    "telefone": "(51) 98229-4951",
    "data": "10/10/2024"
  },
  {
    "nome": "Davison do Canto Duarte",
    "telefone": "(51) 98461-2593",
    "data": "26/01/2024"
  },
  {
    "nome": "Dayse Maria Dias Ferreira",
    "telefone": "(47) 99987-0723",
    "data": "03/09/2023"
  },
  {
    "nome": "Deise Ariela",
    "telefone": "(51) 99459-1000",
    "data": "11/01/2024"
  },
  {
    "nome": "Denis Fabiano Dörr",
    "telefone": "(51) 98496-9765",
    "data": "16/06/2025"
  },
  {
    "nome": "Denise Espindola Castro ",
    "telefone": "(51) 98436-9219",
    "data": "20/11/2024"
  },
  {
    "nome": "Denise Kras Borges dos Santos",
    "telefone": "(21) 99930-9230",
    "data": "09/12/2023"
  },
  {
    "nome": "Denise da Silva Soares ",
    "telefone": "(51) 99836-9597",
    "data": "28/04/2024"
  },
  {
    "nome": "Diego Gevaerd",
    "telefone": "(51) 98269-9593",
    "data": "03/09/2024"
  },
  {
    "nome": "Dirley Aparecido de Moura",
    "telefone": "(19) 99479-2808",
    "data": "22/10/2023"
  },
  {
    "nome": "Djalma clesio costa faria",
    "telefone": "(37) 98815-4380",
    "data": "12/08/2025"
  },
  {
    "nome": "Doraci Teresinha Guedin Souza",
    "telefone": "(51) 98471-6313",
    "data": "05/06/2023"
  },
  {
    "nome": "Doralice Pieroni",
    "telefone": "(66) 99215-3858",
    "data": "11/08/2025"
  },
  {
    "nome": "Doris rejane hoher ",
    "telefone": "(51) 99699-8789",
    "data": "09/08/2024"
  },
  {
    "nome": "Dulce Fontoura Vasconcelos ",
    "telefone": "(51) 99839-1415",
    "data": "29/08/2023"
  },
  {
    "nome": "ELAINE MARIA PACHECO SACCO",
    "telefone": "(53) 99993-7757",
    "data": "28/11/2023"
  },
  {
    "nome": "ELIANA CORISSIA MADUELL NUNES",
    "telefone": "(51) 98110-8632",
    "data": "14/11/2024"
  },
  {
    "nome": "ENEDINA GRAZIANE SARMENTO KNONELOCH",
    "telefone": "(51) 98319-7112",
    "data": "15/05/2025"
  },
  {
    "nome": "ESTER PEREIRA SERAFIM",
    "telefone": "(51) 99962-7992",
    "data": "11/07/2025"
  },
  {
    "nome": "Edgar Jorge Fonseca Soares ",
    "telefone": "(51) 99362-9213",
    "data": "25/10/2024"
  },
  {
    "nome": "Edilaine f. Moreira ",
    "telefone": "(41) 99990-5217",
    "data": "23/03/2024"
  },
  {
    "nome": "Edmilsom Brasil Vieira",
    "telefone": "(55) 99908-3747",
    "data": "13/07/2025"
  },
  {
    "nome": "Edson Brito barbosa ",
    "telefone": "(71) 98470-9174",
    "data": "11/11/2024"
  },
  {
    "nome": "Eduardo Antunes de Souza",
    "telefone": "(48) 98836-7040",
    "data": "07/11/2024"
  },
  {
    "nome": "Eduardo Mello",
    "telefone": "(51) 98151-7365",
    "data": "27/03/2025"
  },
  {
    "nome": "Eduardo Pereira Aguiar",
    "telefone": "(61) 99948-6984",
    "data": "11/11/2023"
  },
  {
    "nome": "Eduardo Rosa da Silva",
    "telefone": "(51) 98134-1993",
    "data": "08/08/2023"
  },
  {
    "nome": "Elena santos",
    "telefone": "(51) 98137-2331",
    "data": "20/06/2024"
  },
  {
    "nome": "Eliane Benete Ribeiro",
    "telefone": "(11) 99542-2353",
    "data": "19/09/2024"
  },
  {
    "nome": "Eliane Farias Francisco",
    "telefone": "(42) 99973-8428",
    "data": "12/07/2024"
  },
  {
    "nome": "Elisabete helena ",
    "telefone": "(51) 98513-3553",
    "data": "29/10/2023"
  },
  {
    "nome": "Eloir Francisco da Silva ",
    "telefone": "(75) 99867-2072",
    "data": "26/07/2025"
  },
  {
    "nome": "Elvira Maria Silveira Teixeira Cesar",
    "telefone": "(51) 99314-6366",
    "data": "25/05/2025"
  },
  {
    "nome": "Emerson Candido ",
    "telefone": "(51) 99249-6790",
    "data": "24/06/2025"
  },
  {
    "nome": "Emmanuel De",
    "telefone": "(22) 99615-0196",
    "data": "02/08/2025"
  },
  {
    "nome": "Erivan Martins de Carvalho ",
    "telefone": "(11) 99307-9692",
    "data": "09/07/2025"
  },
  {
    "nome": "Euclides Pedro Colombo",
    "telefone": "(47) 99911-8690",
    "data": "29/11/2023"
  },
  {
    "nome": "FABIANE SCHMIDT",
    "telefone": "(51) 99964-5053",
    "data": "08/11/2023"
  },
  {
    "nome": "Fabiana Bergamaschi",
    "telefone": "(51) 99392-6036",
    "data": "03/01/2023"
  },
  {
    "nome": "Fabiana Pizzo",
    "telefone": "(19) 99650-4648",
    "data": "19/10/2023"
  },
  {
    "nome": "Fabiano Domingues Schmitz",
    "telefone": "(51) 99169-5708",
    "data": "07/02/2024"
  },
  {
    "nome": "Fabiano da Silva",
    "telefone": "(54) 9699-0927",
    "data": "04/08/2023"
  },
  {
    "nome": "Fabiola Pavan ",
    "telefone": "(42) 99940-0086",
    "data": "17/07/2025"
  },
  {
    "nome": "Fernanda Dal Molin ",
    "telefone": "(48) 98820-4287",
    "data": "05/02/2024"
  },
  {
    "nome": "Fernanda Garbin Comandulli",
    "telefone": "(47) 99999-6677",
    "data": "25/06/2025"
  },
  {
    "nome": "Fernanda de Borba Corrêa",
    "telefone": "(51) 98143-0432",
    "data": "26/05/2025"
  },
  {
    "nome": "Flavia Borges da Costa ",
    "telefone": "(14) 99142-4238",
    "data": "05/10/2023"
  },
  {
    "nome": "Flavio santos ",
    "telefone": "(21) 99982-3357",
    "data": "08/07/2025"
  },
  {
    "nome": "Flottweg do Brasil LTDA",
    "telefone": "(19) 99574-4463",
    "data": "19/08/2024"
  },
  {
    "nome": "Francivani Alencar",
    "telefone": "(11) 96541-3982",
    "data": "04/07/2024"
  },
  {
    "nome": "Fábio Junji Sassaki",
    "telefone": "(11) 97305-0440",
    "data": "14/07/2025"
  },
  {
    "nome": "GILBERTO CORDEIRO DE ÁVILA",
    "telefone": "(45) 99917-7060",
    "data": "10/02/2023"
  },
  {
    "nome": "Geraldine Cornutti",
    "telefone": "(51) 98211-0705",
    "data": "02/01/2025"
  },
  {
    "nome": "German Rengifo Alvis ",
    "telefone": "(11) 99379-6790",
    "data": "31/01/2024"
  },
  {
    "nome": "Gilberto Staffen ",
    "telefone": "(51) 99871-5416",
    "data": "19/07/2025"
  },
  {
    "nome": "Gilberto tendahl",
    "telefone": "(51) 99117-3937",
    "data": "20/06/2024"
  },
  {
    "nome": "Gilvane Model Melos",
    "telefone": "(51) 99708-0760",
    "data": "27/06/2023"
  },
  {
    "nome": "Giovana Bragança",
    "telefone": "(51) 98651-0946",
    "data": "04/10/2024"
  },
  {
    "nome": "Gisele Guersoni",
    "telefone": "(11) 99971-0556",
    "data": "22/09/2023"
  },
  {
    "nome": "Gisely lopes",
    "telefone": "(19) 98860-8284",
    "data": "15/02/2023"
  },
  {
    "nome": "Gislaine Conceição Dutra Albano ",
    "telefone": "(51) 98280-2321",
    "data": "07/06/2025"
  },
  {
    "nome": "Glaucio da Silva Candido",
    "telefone": "(11) 98138-4001",
    "data": "03/03/2024"
  },
  {
    "nome": "Graci alves dos santos",
    "telefone": "(81) 98897-5443",
    "data": "10/11/2023"
  },
  {
    "nome": "Graziela Martins de Brito",
    "telefone": "(51) 99315-1566",
    "data": "26/04/2024"
  },
  {
    "nome": "Graziela Napoli",
    "telefone": "(51) 99544-3832",
    "data": "14/01/2023"
  },
  {
    "nome": "HED NELSON DE ANTONI HUBNER",
    "telefone": "(51) 98535-5056",
    "data": "06/07/2025"
  },
  {
    "nome": "HELENA SILVIA HINTE DA COSTA",
    "telefone": "(11) 97243-2557",
    "data": "18/06/2024"
  },
  {
    "nome": "Helena Martins",
    "telefone": "(21) 99238-3062",
    "data": "08/07/2025"
  },
  {
    "nome": "Henrique Leistner",
    "telefone": "(51) 98535-3579",
    "data": "03/12/2024"
  },
  {
    "nome": "Heráclito de Freitas Valle Corrêa ",
    "telefone": "(51) 98900-6080",
    "data": "26/01/2024"
  },
  {
    "nome": "Honória Camargo Saraiva ",
    "telefone": "(51) 98600-4224",
    "data": "08/12/2023"
  },
  {
    "nome": "IARA AVANI JAQUES HADLICH",
    "telefone": "(55) 99918-4791",
    "data": "20/03/2025"
  },
  {
    "nome": "INGRID BERGMAN INCHAUSTI DE BARROS",
    "telefone": "(51) 98319-5711",
    "data": "26/01/2024"
  },
  {
    "nome": "IVETE NOECI DA CUNHA NUNES",
    "telefone": "(51) 99411-0024",
    "data": "22/06/2023"
  },
  {
    "nome": "Ingrid VIRGINIA de Oliveira Sena ",
    "telefone": "(86) 98844-7147",
    "data": "18/04/2025"
  },
  {
    "nome": "Isabelle Pimenta ",
    "telefone": "(51) 98537-1111",
    "data": "25/07/2025"
  },
  {
    "nome": "Itamires ferreira ",
    "telefone": "(88) 98163-4723",
    "data": "01/12/2024"
  },
  {
    "nome": "Ivanir de Fatima Andrade Maestri",
    "telefone": "(48) 99112-7955",
    "data": "10/02/2025"
  },
  {
    "nome": "Ivete Maria Theobald",
    "telefone": "(51) 99996-4292",
    "data": "01/05/2024"
  },
  {
    "nome": "Ivone Lúcia cantelli ",
    "telefone": "(48) 99985-1880",
    "data": "17/04/2024"
  },
  {
    "nome": "Izabel Cristina Paludo Oldoni ",
    "telefone": "(49) 98870-2720",
    "data": "23/08/2024"
  },
  {
    "nome": "Izolema vaz da silva",
    "telefone": "(51) 99256-3747",
    "data": "30/05/2023"
  },
  {
    "nome": "JANAINA MIRANDA DORETO",
    "telefone": "(11) 98210-1381",
    "data": "20/09/2024"
  },
  {
    "nome": "JOSYARA DE ALMEIDA",
    "telefone": "(49) 99834-4023",
    "data": "24/10/2024"
  },
  {
    "nome": "JULIANA ENGEL PEDRASSANI",
    "telefone": "(41) 98805-3958",
    "data": "01/01/2023"
  },
  {
    "nome": "Jacira Maia portela ",
    "telefone": "(54) 99633-2206",
    "data": "29/08/2023"
  },
  {
    "nome": "Jair Paulo",
    "telefone": "(51) 98957-0056",
    "data": "28/07/2023"
  },
  {
    "nome": "Janaina de Brito Asprino",
    "telefone": "(11) 99734-2898",
    "data": "12/02/2024"
  },
  {
    "nome": "Jane Célia Carlone",
    "telefone": "(41) 99951-5568",
    "data": "05/05/2025"
  },
  {
    "nome": "Jane Maria G Bombardelli",
    "telefone": "(51) 98060-0860",
    "data": "02/03/2024"
  },
  {
    "nome": "Jane dos Santos Santos ",
    "telefone": "(53) 99977-1978",
    "data": "15/05/2023"
  },
  {
    "nome": "Janete Casagrande ",
    "telefone": "(54) 98412-9005",
    "data": "17/08/2023"
  },
  {
    "nome": "Janine Joana gorreis",
    "telefone": "(51) 9614-2583",
    "data": "12/04/2023"
  },
  {
    "nome": "Jaqueline  Nunes Silveira",
    "telefone": "(51) 99693-9595",
    "data": "07/04/2024"
  },
  {
    "nome": "Jayne Moraes",
    "telefone": "(55) 99648-5948",
    "data": "12/08/2023"
  },
  {
    "nome": "Joilson Souza de Queiroz Junior ",
    "telefone": "(11) 94495-8451",
    "data": "10/11/2023"
  },
  {
    "nome": "Jonas de Lima Mortola ",
    "telefone": "(53) 99975-7526",
    "data": "26/02/2024"
  },
  {
    "nome": "Jorge Luis Lima ",
    "telefone": "(51) 99109-3504",
    "data": "02/09/2024"
  },
  {
    "nome": "Jorge dos Santos Silva ",
    "telefone": "(22) 99241-8959",
    "data": "03/02/2025"
  },
  {
    "nome": "Jose Marcio",
    "telefone": "(67) 98169-2621",
    "data": "23/07/2025"
  },
  {
    "nome": "Jose ivaldob da sila",
    "telefone": "(11) 97032-2828",
    "data": "03/11/2023"
  },
  {
    "nome": "Josiane Souza",
    "telefone": "(51) 99760-6874",
    "data": "30/10/2023"
  },
  {
    "nome": "José de Souza Azevedo ",
    "telefone": "(11) 97159-2159",
    "data": "08/08/2025"
  },
  {
    "nome": "Jozelaine Martins justo ",
    "telefone": "(51) 99934-3823",
    "data": "20/06/2023"
  },
  {
    "nome": "João Assis ",
    "telefone": "(42) 99975-1332",
    "data": "21/03/2025"
  },
  {
    "nome": "João Rodrigues dos Santos",
    "telefone": "(11) 99637-3405",
    "data": "15/09/2024"
  },
  {
    "nome": "João celestino dos santos ",
    "telefone": "(71) 98470-9174",
    "data": "26/11/2024"
  },
  {
    "nome": "Juarez Martire",
    "telefone": "(19) 99727-0708",
    "data": "22/07/2025"
  },
  {
    "nome": "Julaine Batista",
    "telefone": "(54) 98422-3144",
    "data": "25/11/2024"
  },
  {
    "nome": "Juliane Sartori",
    "telefone": "(51) 98050-6330",
    "data": "21/07/2023"
  },
  {
    "nome": "Julieta Rodrigues de Oliveira ",
    "telefone": "(85) 98171-3601",
    "data": "10/11/2023"
  },
  {
    "nome": "Juraci a s d santos ",
    "telefone": "(45) 98431-5191",
    "data": "16/04/2025"
  },
  {
    "nome": "Jéferson Barros",
    "telefone": "(53) 98411-9106",
    "data": "21/06/2025"
  },
  {
    "nome": "Jéssica Maria Sabel",
    "telefone": "(47) 99685-0076",
    "data": "30/09/2024"
  },
  {
    "nome": "Júlio César Raposo Ferreira",
    "telefone": "(21) 97615-9246",
    "data": "11/06/2025"
  },
  {
    "nome": "Kaique costa dos Santos ",
    "telefone": "(22) 98103-4204",
    "data": "25/11/2023"
  },
  {
    "nome": "Karine Cristina Mendonça Galli do Rosario ",
    "telefone": "(11) 97066-3771",
    "data": "03/06/2023"
  },
  {
    "nome": "Karlla Turcato ",
    "telefone": "(41) 98899-2021",
    "data": "06/10/2023"
  },
  {
    "nome": "Karol cunha",
    "telefone": "(11) 98766-5433",
    "data": "26/01/2024"
  },
  {
    "nome": "Keit Roberta Fogaça ",
    "telefone": "(51) 99269-9595",
    "data": "02/10/2023"
  },
  {
    "nome": "LEILA B NUNES",
    "telefone": "(51) 99953-4017",
    "data": "23/07/2024"
  },
  {
    "nome": "LIA CRISTIANE ERENO DOS SANTOS",
    "telefone": "(51) 99859-0629",
    "data": "17/11/2023"
  },
  {
    "nome": "LIDIANE MATOS DE LIMA",
    "telefone": "(51) 99363-4341",
    "data": "21/11/2023"
  },
  {
    "nome": "LISSA PANIQUAR VON AMELN/PAULO RISI",
    "telefone": "(11) 98179-7760",
    "data": "14/02/2024"
  },
  {
    "nome": "LURDES BRIVIO",
    "telefone": "(55) 99201-0318",
    "data": "05/01/2025"
  },
  {
    "nome": "Lari Tolotti",
    "telefone": "(51) 99718-7279",
    "data": "13/07/2023"
  },
  {
    "nome": "Larissa Cardoso",
    "telefone": "(54) 99148-0013",
    "data": "10/07/2024"
  },
  {
    "nome": "Larí Cezar Bordin",
    "telefone": "(51) 99251-3871",
    "data": "03/06/2024"
  },
  {
    "nome": "Laura Kroeff",
    "telefone": "(51) 99604-0590",
    "data": "28/04/2024"
  },
  {
    "nome": "Lauro Pereira Dias",
    "telefone": "(51) 98123-3310",
    "data": "09/01/2023"
  },
  {
    "nome": "Liane Zuge",
    "telefone": "(55) 99125-5424",
    "data": "08/01/2025"
  },
  {
    "nome": "Liliane Godoy da Silva",
    "telefone": "(54) 99606-2039",
    "data": "17/05/2025"
  },
  {
    "nome": "Lourdes Helena Rosa Santos ",
    "telefone": "(51) 99309-7501",
    "data": "13/08/2024"
  },
  {
    "nome": "Luana Costa da Rosa ",
    "telefone": "(53) 98114-6075",
    "data": "29/11/2024"
  },
  {
    "nome": "Lucas Borges",
    "telefone": "(19) 99341-0077",
    "data": "05/11/2024"
  },
  {
    "nome": "Luciana Possa Petuco",
    "telefone": "(51) 99396-3113",
    "data": "29/05/2023"
  },
  {
    "nome": "Luis Adriano de Oliveira ",
    "telefone": "(51) 99988-7063",
    "data": "31/05/2025"
  },
  {
    "nome": "Luis Carlos Felippe dos Santos ",
    "telefone": "(51) 98529-3169",
    "data": "05/06/2023"
  },
  {
    "nome": "Luiz Adão Cardoso Ribeiro ",
    "telefone": "(51) 99508-8639",
    "data": "06/11/2023"
  },
  {
    "nome": "Luiz Ricardo Capitanio Dal Santo",
    "telefone": "(49) 99809-3608",
    "data": "20/02/2024"
  },
  {
    "nome": "MARA ELIANE PIRES DE SOUZA",
    "telefone": "(54) 99641-1016",
    "data": "09/06/2023"
  },
  {
    "nome": "MARCELO VICTOR SILVA",
    "telefone": "(11) 99202-8816",
    "data": "12/07/2025"
  },
  {
    "nome": "MARIO AUGUSTO ROCHA",
    "telefone": "(11) 99902-9568",
    "data": "18/07/2025"
  },
  {
    "nome": "MARIUZA ERNST DE OLIVEIRA ",
    "telefone": "(55) 99944-4066",
    "data": "01/02/2023"
  },
  {
    "nome": "MARLENE ALEXANDRINO DOS SANTOS",
    "telefone": "(42) 99871-6908",
    "data": "03/12/2023"
  },
  {
    "nome": "MILTON HARTMANN",
    "telefone": "(51) 98134-5858",
    "data": "01/11/2024"
  },
  {
    "nome": "Magda Roberta de Menezes ",
    "telefone": "(41) 99733-2781",
    "data": "24/04/2025"
  },
  {
    "nome": "Maira Cristina de Ramos",
    "telefone": "(47) 9996-2996",
    "data": "15/01/2023"
  },
  {
    "nome": "Mara Pacheco ",
    "telefone": "(51) 98509-4319",
    "data": "29/06/2024"
  },
  {
    "nome": "Marcelo de Carvalho Heineck",
    "telefone": "(51) 99922-3774",
    "data": "05/06/2023"
  },
  {
    "nome": "Marcio Freitas",
    "telefone": "(48) 99818-3532",
    "data": "23/07/2025"
  },
  {
    "nome": "Marcos Adão dorneles ",
    "telefone": "(15) 99700-5874",
    "data": "27/07/2025"
  },
  {
    "nome": "Marcos Tavares Pacheco",
    "telefone": "(53) 98164-3827",
    "data": "07/06/2023"
  },
  {
    "nome": "Marcos de Moura Soares",
    "telefone": "(44) 99960-9999",
    "data": "08/11/2023"
  },
  {
    "nome": "Margarete Borga ",
    "telefone": "(51) 99806-4803",
    "data": "08/10/2023"
  },
  {
    "nome": "Maria Aparecida Russo",
    "telefone": "(51) 99982-5892",
    "data": "04/07/2023"
  },
  {
    "nome": "Maria Helena Zanettini",
    "telefone": "(51) 99806-6407",
    "data": "05/08/2024"
  },
  {
    "nome": "Maria Inês Dalpias Oliveira ",
    "telefone": "(51) 98429-9248",
    "data": "11/05/2025"
  },
  {
    "nome": "Maria Lúcia Mantelli ",
    "telefone": "(51) 99981-3168",
    "data": "25/01/2024"
  },
  {
    "nome": "Maria Mercedes Gil Garcia ",
    "telefone": "(51) 98209-1946",
    "data": "16/05/2025"
  },
  {
    "nome": "Maria de Fatima Zanin ",
    "telefone": "(54) 99661-4786",
    "data": "17/11/2024"
  },
  {
    "nome": "Maria de Fátima Gottschalg Duarte ",
    "telefone": "(31) 99430-5819",
    "data": "10/07/2025"
  },
  {
    "nome": "Maria de lourdes Almeida",
    "telefone": "(54) 98132-3713",
    "data": "02/01/2023"
  },
  {
    "nome": "Marilaine Quadros Becker de",
    "telefone": "(51) 99897-6650",
    "data": "17/06/2024"
  },
  {
    "nome": "Marilene Carvalho de Oliveira de Camillis ",
    "telefone": "(51) 98442-1230",
    "data": "23/06/2025"
  },
  {
    "nome": "Marilene Lopes Corrêa ",
    "telefone": "(51) 98186-8020",
    "data": "20/07/2025"
  },
  {
    "nome": "Marineusa Nicoletti Thuller",
    "telefone": "(47) 98820-4422",
    "data": "23/08/2023"
  },
  {
    "nome": "Marisa Cuba de Morais Calado ",
    "telefone": "(11) 98202-5673",
    "data": "13/07/2025"
  },
  {
    "nome": "Marisete aparecisa Rodrigues dos santos",
    "telefone": "(51) 98584-8846",
    "data": "03/08/2024"
  },
  {
    "nome": "Marlene Cação",
    "telefone": "(11) 94540-6349",
    "data": "09/04/2025"
  },
  {
    "nome": "Marli a f freitas Freitas",
    "telefone": "(62) 99253-2824",
    "data": "15/06/2025"
  },
  {
    "nome": "Marlise Ourique  Gomes",
    "telefone": "(51) 98149-3041",
    "data": "18/11/2023"
  },
  {
    "nome": "Marília Rocha Borges",
    "telefone": "(41) 99637-1764",
    "data": "09/02/2024"
  },
  {
    "nome": "Michelle Garcia ",
    "telefone": "(51) 98042-5192",
    "data": "12/06/2025"
  },
  {
    "nome": "Michelli de Oliveira Machado ",
    "telefone": "(45) 99950-4847",
    "data": "25/04/2023"
  },
  {
    "nome": "Miguel Rossano Neto",
    "telefone": "(19) 99929-1424",
    "data": "16/07/2025"
  },
  {
    "nome": "Moisés oliveira Santos",
    "telefone": "(11) 98842-8755",
    "data": "15/06/2023"
  },
  {
    "nome": "Márcia Elisa Férsula de Souza ",
    "telefone": "(51) 98555-6042",
    "data": "18/08/2023"
  },
  {
    "nome": "Márcia Pesch ",
    "telefone": "(41) 99126-0011",
    "data": "31/05/2024"
  },
  {
    "nome": "Márcio Romeu Gowert",
    "telefone": "(69) 98473-9051",
    "data": "12/11/2023"
  },
  {
    "nome": "NEY HAROLDO PEREIRA LOPES",
    "telefone": "(42) 99931-8857",
    "data": "08/06/2024"
  },
  {
    "nome": "NOEMI SALVADOR DA FONSECA",
    "telefone": "(51) 99305-5368",
    "data": "25/07/2023"
  },
  {
    "nome": "Neida viviani Goulart de Souza ",
    "telefone": "(51) 98177-7213",
    "data": "03/05/2023"
  },
  {
    "nome": "Neila bessa",
    "telefone": "(51) 99882-4729",
    "data": "26/03/2024"
  },
  {
    "nome": "Nicoly Baierle",
    "telefone": "(51) 99101-7540",
    "data": "18/05/2025"
  },
  {
    "nome": "Nilza Marques ",
    "telefone": "(21) 99417-3415",
    "data": "22/02/2024"
  },
  {
    "nome": "Noe Lumertz",
    "telefone": "(51) 99911-2121",
    "data": "25/04/2024"
  },
  {
    "nome": "Núbia Helena da Silva ",
    "telefone": "(11) 94985-3765",
    "data": "13/06/2024"
  },
  {
    "nome": "Odila ferreira mendes",
    "telefone": "(47) 99142-3629",
    "data": "12/02/2023"
  },
  {
    "nome": "Olga Heidrich",
    "telefone": "(11) 97481-6217",
    "data": "07/07/2025"
  },
  {
    "nome": "Orley Carlos Gayger",
    "telefone": "(54) 99902-3865",
    "data": "27/07/2025"
  },
  {
    "nome": "PAULO JOSE BARBOSA GUTIERRES FILHO",
    "telefone": "(61) 98339-7959",
    "data": "30/01/2024"
  },
  {
    "nome": "PAULO LEANDRO DOS SANTOS",
    "telefone": "(51) 99814-7820",
    "data": "07/08/2025"
  },
  {
    "nome": "PEDRO WALDRICH",
    "telefone": "(47) 99983-3954",
    "data": "22/07/2025"
  },
  {
    "nome": "Paola Schmidt Oberdiek ",
    "telefone": "(53) 98137-3961",
    "data": "20/09/2024"
  },
  {
    "nome": "Patricia Regina Oliveira ",
    "telefone": "(47) 99110-7272",
    "data": "16/12/2024"
  },
  {
    "nome": "Patrícia delgado",
    "telefone": "(51) 98132-4654",
    "data": "06/11/2023"
  },
  {
    "nome": "Paula Antonello",
    "telefone": "(51) 98131-7722",
    "data": "16/10/2024"
  },
  {
    "nome": "Paulo Antonio Silva da Conceição ",
    "telefone": "(22) 99858-2994",
    "data": "02/04/2023"
  },
  {
    "nome": "Paulo José Laurindo Rodrigues ",
    "telefone": "(41) 99868-0042",
    "data": "28/12/2024"
  },
  {
    "nome": "Petronilia Gama da Gama",
    "telefone": "(51) 98447-5872",
    "data": "15/01/2023"
  },
  {
    "nome": "Priscila da Silva Brombatti",
    "telefone": "(51) 99647-7431",
    "data": "05/06/2024"
  },
  {
    "nome": "Priscilla Melotto Costa ",
    "telefone": "(41) 99760-6433",
    "data": "27/05/2024"
  },
  {
    "nome": "RENATA MELLO CEZAR",
    "telefone": "(51) 99604-1167",
    "data": "27/07/2025"
  },
  {
    "nome": "ROGERIA BEZERRA",
    "telefone": "(41) 98510-3033",
    "data": "08/02/2025"
  },
  {
    "nome": "ROSELI CECCON RUBBO",
    "telefone": "(54) 99616-0989",
    "data": "06/05/2024"
  },
  {
    "nome": "Rafael de Assis Leonardi",
    "telefone": "(51) 98461-6022",
    "data": "14/07/2025"
  },
  {
    "nome": "Rafaela Valls Ferrer ",
    "telefone": "(11) 94794-3933",
    "data": "11/01/2024"
  },
  {
    "nome": "Regina Celia Torrano Lima ",
    "telefone": "(61) 98196-9540",
    "data": "10/11/2023"
  },
  {
    "nome": "Renata Junqueira ",
    "telefone": "(16) 98102-4198",
    "data": "12/07/2025"
  },
  {
    "nome": "Renata Rogoski de Souza Negreiros ",
    "telefone": "(15) 99716-5568",
    "data": "11/02/2024"
  },
  {
    "nome": "Rene Walter Cobelli Jacques",
    "telefone": "(51) 99968-3841",
    "data": "13/09/2024"
  },
  {
    "nome": "Roberta da Silveira zanatta ",
    "telefone": "(51) 99956-4241",
    "data": "01/06/2023"
  },
  {
    "nome": "Rodrigo Loch",
    "telefone": "(51) 99986-0821",
    "data": "23/12/2024"
  },
  {
    "nome": "Rosane Cardoso Ede",
    "telefone": "(51) 99119-1820",
    "data": "07/04/2024"
  },
  {
    "nome": "Rosane Rodrigues",
    "telefone": "(55) 51998-3207",
    "data": "11/07/2025"
  },
  {
    "nome": "Roselaine Goularte",
    "telefone": "(51) 99326-7737",
    "data": "17/08/2024"
  },
  {
    "nome": "Roseli Z ruckert",
    "telefone": "(51) 98446-2103",
    "data": "19/01/2023"
  },
  {
    "nome": "Rosemar Gonçalves ",
    "telefone": "(51) 99931-9614",
    "data": "14/06/2025"
  },
  {
    "nome": "Rosinéia Passos ",
    "telefone": "(51) 99963-4609",
    "data": "12/10/2024"
  },
  {
    "nome": "Rosmari Girardi Lamb ",
    "telefone": "(54) 9902-3366",
    "data": "04/05/2024"
  },
  {
    "nome": "Rute ramos da silva ",
    "telefone": "(81) 99808-9940",
    "data": "06/08/2025"
  },
  {
    "nome": "SAFRASECIFRAS Empresarial",
    "telefone": "(53) 99933-3387",
    "data": "07/08/2023"
  },
  {
    "nome": "SAMARA RODRIGUES GOMEZ",
    "telefone": "(51) 98660-7236",
    "data": "04/11/2024"
  },
  {
    "nome": "SANDRA APARECIDA TOSCAN",
    "telefone": "(51) 98186-0893",
    "data": "20/06/2024"
  },
  {
    "nome": "SUELEN ALESSANDRA PINTO MOIANO",
    "telefone": "(51) 98216-9455",
    "data": "02/07/2024"
  },
  {
    "nome": "Sara Santos ",
    "telefone": "(11) 94815-6642",
    "data": "24/03/2025"
  },
  {
    "nome": "Sidonia huckembeck",
    "telefone": "(51) 99233-9575",
    "data": "19/01/2023"
  },
  {
    "nome": "Sileni Machado",
    "telefone": "(12) 99154-1644",
    "data": "28/05/2023"
  },
  {
    "nome": "Silvia Regina Antunes Ramos",
    "telefone": "(15) 98813-4676",
    "data": "07/06/2025"
  },
  {
    "nome": "Simone Cristine klamt ",
    "telefone": "(51) 99970-9500",
    "data": "05/07/2025"
  },
  {
    "nome": "Simone oliveira",
    "telefone": "(15) 99722-5222",
    "data": "13/05/2024"
  },
  {
    "nome": "Simone p Meneses ",
    "telefone": "(55) 99694-8700",
    "data": "09/11/2023"
  },
  {
    "nome": "Solano Venâncio da Rosa",
    "telefone": "(51) 99128-2837",
    "data": "02/04/2024"
  },
  {
    "nome": "Sonia Sbruzzi",
    "telefone": "(51) 99207-8470",
    "data": "01/08/2025"
  },
  {
    "nome": "Suzana Maria Pistorello ",
    "telefone": "(54) 99677-5504",
    "data": "31/01/2025"
  },
  {
    "nome": "SÉRGIO MARTINS DE MARTINS",
    "telefone": "(51) 99934-9367",
    "data": "01/11/2024"
  },
  {
    "nome": "TADEU PRETTO",
    "telefone": "(51) 98163-8180",
    "data": "04/12/2024"
  },
  {
    "nome": "Tatiana Borba ",
    "telefone": "(51) 9392-8734",
    "data": "23/06/2023"
  },
  {
    "nome": "Terezinha Camargo Gomes",
    "telefone": "(51) 99815-5764",
    "data": "02/04/2023"
  },
  {
    "nome": "Thales ruan do canto ",
    "telefone": "(48) 99635-6349",
    "data": "18/11/2024"
  },
  {
    "nome": "Transargo Transportes Ltda",
    "telefone": "(51) 99821-3115",
    "data": "20/10/2023"
  },
  {
    "nome": "VALTER NEIS",
    "telefone": "(47) 98408-0288",
    "data": "14/08/2024"
  },
  {
    "nome": "VERA MAYER",
    "telefone": "(51) 98149-2225",
    "data": "22/02/2024"
  },
  {
    "nome": "VITALINO SANTIN",
    "telefone": "(71) 98898-3920",
    "data": "27/07/2025"
  },
  {
    "nome": "Valdomir de Souza ",
    "telefone": "(51) 99437-9612",
    "data": "22/06/2024"
  },
  {
    "nome": "Vanessa Gonçalves Michel",
    "telefone": "(51) 98438-8145",
    "data": "11/06/2023"
  },
  {
    "nome": "Vania Boklis",
    "telefone": "(51) 99808-9712",
    "data": "17/09/2023"
  },
  {
    "nome": "Vera Lúcia kist da Silva ",
    "telefone": "(51) 99880-0231",
    "data": "29/05/2024"
  },
  {
    "nome": "Viviane Santiago",
    "telefone": "(51) 98593-2787",
    "data": "21/02/2024"
  },
  {
    "nome": "Vladimir Botelho",
    "telefone": "(51) 99953-7950",
    "data": "13/07/2025"
  },
  {
    "nome": "WILLIAN BIASON",
    "telefone": "(54) 99903-6026",
    "data": "10/08/2025"
  },
  {
    "nome": "Walmir Alex dos Santos",
    "telefone": "(41) 99666-6084",
    "data": "01/08/2025"
  },
  {
    "nome": "Wendy Macedo Cardoso",
    "telefone": "(51) 99554-2624",
    "data": "15/05/2025"
  },
  {
    "nome": "William Eduardo Winther",
    "telefone": "(51) 98178-1179",
    "data": "10/01/2024"
  },
  {
    "nome": "Wilson cavalheiro ",
    "telefone": "(51) 99229-0017",
    "data": "09/11/2024"
  },
  {
    "nome": "Zelia Alves Monteiro",
    "telefone": "(51) 99561-1060",
    "data": "05/09/2023"
  },
  {
    "nome": "Zuleide da Silva Cardoso lopes ",
    "telefone": "(48) 99651-3753",
    "data": "12/06/2025"
  },
  {
    "nome": "alcides j souza",
    "telefone": "(67) 99141-3153",
    "data": "30/08/2024"
  },
  {
    "nome": "augusto rillo mesquita",
    "telefone": "(51) 98437-2797",
    "data": "10/11/2023"
  },
  {
    "nome": "carla pereira bastos",
    "telefone": "(51) 98525-9082",
    "data": "29/08/2023"
  },
  {
    "nome": "centro educacional prisma",
    "telefone": "(51) 98959-2651",
    "data": "14/05/2025"
  },
  {
    "nome": "cintia vieira essinger",
    "telefone": "(53) 98117-0016",
    "data": "23/10/2024"
  },
  {
    "nome": "claire michele cuinier",
    "telefone": "(11) 98850-2936",
    "data": "13/07/2024"
  },
  {
    "nome": "daniel do nascimento",
    "telefone": "(17) 99114-1323",
    "data": "07/11/2024"
  },
  {
    "nome": "delcio homn ",
    "telefone": "(51) 99696-9818",
    "data": "18/01/2025"
  },
  {
    "nome": "delsa bianchetti",
    "telefone": "(51) 99319-2622",
    "data": "05/07/2023"
  },
  {
    "nome": "delsa bianchetti",
    "telefone": "(51) 9319-2622",
    "data": "08/07/2023"
  },
  {
    "nome": "etemilson de jesus",
    "telefone": "(71) 99218-9821",
    "data": "10/11/2023"
  },
  {
    "nome": "gelson mazzotti",
    "telefone": "(51) 99945-9393",
    "data": "15/06/2025"
  },
  {
    "nome": "helma cavalheiro",
    "telefone": "(11) 99182-5715",
    "data": "27/10/2023"
  },
  {
    "nome": "henrique leistner silva",
    "telefone": "(51) 9651-0946",
    "data": "18/10/2024"
  },
  {
    "nome": "jairo machado",
    "telefone": "(51) 99988-4053",
    "data": "28/11/2023"
  },
  {
    "nome": "joedson da silva santana",
    "telefone": "(71) 98382-4007",
    "data": "20/06/2023"
  },
  {
    "nome": "juliana Martins Silveira",
    "telefone": "(51) 99817-8689",
    "data": "03/02/2025"
  },
  {
    "nome": "jussania porcher",
    "telefone": "(51) 99127-0712",
    "data": "25/09/2023"
  },
  {
    "nome": "marcia Caldieraro",
    "telefone": "(53) 9969-6304",
    "data": "24/05/2023"
  },
  {
    "nome": "michel queiroz santana",
    "telefone": "(21) 99063-0370",
    "data": "10/11/2023"
  },
  {
    "nome": "rafael furlan mossmann",
    "telefone": "(51) 98135-2811",
    "data": "10/07/2025"
  },
  {
    "nome": "valmiro r santos",
    "telefone": "(41) 99941-8250",
    "data": "17/01/2023"
  },
  {
    "nome": "veronica zuanazzi zanella",
    "telefone": "(51) 99916-0160",
    "data": "17/06/2024"
  },
  {
    "nome": "vittorio zaparoli",
    "telefone": "(51) 99682-1399",
    "data": "23/10/2023"
  }
];

// Função para calcular dias desde a última compra
function daysSincePurchase(dateStr) {
    if (!dateStr || dateStr === '') return null;
    
    try {
        const [day, month, year] = dateStr.split('/');
        const purchaseDate = new Date(year, month - 1, day);
        const today = new Date();
        const diffTime = today - purchaseDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    } catch (e) {
        return null;
    }
}

// Exportar dados
window.clientsData = clientsData;
window.daysSincePurchase = daysSincePurchase;
