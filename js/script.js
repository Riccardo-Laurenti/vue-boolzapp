const { createApp } = Vue
const contacts= [
    {
        name: 'Michele',
        avatar: './img/avatar_1.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Fabio',
        avatar: './img/avatar_2.jpg',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Samuele',
        avatar: './img/avatar_3.jpg',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro B.',
        avatar: './img/avatar_4.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro L.',
        avatar: './img/avatar_5.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },
    {
        name: 'Claudia',
        avatar: './img/avatar_6.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Federico',
        avatar: './img/avatar_7.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Davide',
        avatar: './img/avatar_8.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
]


const DateTime = luxon.DateTime

createApp({
    data() {
        return {
            contacts: contacts,
            currentIndex:0,
            inputValue:'',
            DT:DateTime,
            search:'',

        }
    },

    methods: {
        chatSelection(index){
            this.currentIndex = index

        },

        newMessage(){

  
            this.inputValue = this.inputValue.trim()
            if (this.inputValue === '') {
                return
            }

            const nowDate= this.getDate('dd/LL/yyyy HH:mm:ss')


            const newMex ={
                date: nowDate,
                message: this.inputValue,
                status: 'sent'
            }
            this.contacts[this.currentIndex].messages.push(newMex)
            const activeContact = this.contacts[this.currentIndex]

            setTimeout(() => {
                const newResponse ={
                    date: nowDate,
                    message: 'ok',
                    status: 'received'
                }
                activeContact.messages.push(newResponse)
            }, 1000)    
            
            this.inputValue = ''    
        },

        
        messageDate(i){
            newDate = this.contacts[this.currentIndex].messages[i].date
            newDateFormat = this.DT.fromFormat(newDate,'dd/LL/yyyy HH:mm:ss')
            hours = newDateFormat.toFormat('HH:mm') 
            return hours;
        },

        getDate(format){
            let now = DateTime.now()
            if(!format){
                format = 'dd/LL/yyyy'
            }
            console.log(now.toFormat(format));
            return now.toFormat(format)
        },

        isHidden(contact){
            const name = contact.name.toLowerCase()
            const search = this.search.trim().toLowerCase()

            const result = !name.includes(search)

            return result
        },

        lastMessage(contact){

            let lastIndex = contact.messages.length - 1
            for (let i = 0; i < lastIndex; i++) {
                return contact.messages[lastIndex].message
            }
        },

        lastDate(contact){

            let lastIndex = contact.messages.length - 1
            for (let i = 0; i < lastIndex; i++) {
                let lastMessageDate = contact.messages[lastIndex].date
                let newFormat = this.DT.fromFormat(lastMessageDate,'dd/LL/yyyy HH:mm:ss')
                let hours = newFormat.toFormat('HH:mm') 
                return hours
                
            }
        }
        
    }
}).mount('#app');