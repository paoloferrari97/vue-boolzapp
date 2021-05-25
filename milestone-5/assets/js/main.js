//Milestone 1:
//Replica della grafica con la possibilità di avere
//messaggi scritti dall’utente(verdi) e dall’interlocutore(bianco) 
//assegnando due classi CSS diverse

//Visualizzazione dinamica della lista contatti: tramite la direttiva 
//v -for, visualizzare nome e immagine di ogni contatto


//Milestone 2:
//Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, 
//visualizzare tutti i messaggi relativi al contatto attivo 
//all’interno del pannello della conversazione

//Click sul contatto mostra la conversazione del contatto cliccato


//Milestone 3:
//Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
//“enter” il testo viene aggiunto al thread sopra, come messaggio verde

//Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
//un “ok” come risposta, che apparirà dopo 1 secondo.


//Milestone 4:
//Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
//contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo 
//“mar” rimangono solo Marco e Martina)


//Milestone 5 - opzionale
//Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
//permette di cancellare il messaggio selezionato

//Visualizzazione ora e ultimo messaggio inviato / ricevuto nella lista dei contatti

const app = new Vue({
    el: "#app",
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '',
                        text: "Nessun messaggio!",
                        status: "avviso"
                    },
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '',
                        text: "Nessun messaggio!",
                        status: "avviso"
                    },
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
        
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '',
                        text: "Nessun messaggio!",
                        status: "avviso"
                    },
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '',
                        text: "Nessun messaggio!",
                        status: "avviso"
                    },
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            }
        ],
        nuovoMessaggio: "",
        counter: 0,
        cerca: "",
        me: {
            name: "Tu",
            avatar: "_io",
            visible: true
        }
        
    },
    methods: {
        selezionaChat(index) {
            this.counter = index;
            this.updateScroll();
        },
        inviaMessaggio(event) {
            
            let data = dayjs().format("DD/MM/YYYY HH:mm:ss");

            if (this.nuovoMessaggio != "") {
                this.contacts[this.counter].messages.push({
                    date: data,
                    text: this.nuovoMessaggio,
                    status: 'sent'
                });
                this.nuovoMessaggio = "";
                this.updateScroll();
                this.rispostaMessaggio();
            }
        },
        rispostaMessaggio() {
            setTimeout(() => {
                let data = dayjs().format("DD/MM/YYYY HH:mm:ss");
                this.contacts[this.counter].messages.push({
                    date: data,
                    text: "Ok",
                    status: 'received'
                });
                this.updateScroll();
            }, 1000);
        },
        updateScroll() {
            setTimeout(() => {
                var element = document.getElementById("main");
                element.scrollTop = element.scrollHeight;
            }, 100);
        }, //Funziona solo se la richiamo in inviaMessaggio() o rispostaMessaggio() e però non va bene fino in fondo (1 msg lo nasconde sotto)
        eliminaMessaggio(index) {
            this.contacts[this.counter].messages.splice(index, 1);
            document.querySelector(`#opz${index} > div`).style.display = "none";
        },
        apriOpzioni(index) {
            document.querySelector(`#opz${index} > div`).style.display = "block";
        },
        chiudiOpzioni(index) {
            document.querySelector(`#opz${index} > div`).style.display = "none";
        },
        smileFace() {
            this.nuovoMessaggio += "😀";
        },
        catturaAudio() {
            document.querySelector(".fas.fa-microphone").style.color = "red";
                navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                const audioChunks = [];
                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    audio.play();
                    let data = dayjs().format("DD/MM/YYYY HH:mm:ss");
                    this.contacts[this.counter].messages.push({
                        date: data,
                        text: audio,
                        status: 'audio_sent'
                    });
                    console.log(audioUrl);
                    this.updateScroll();
                    this.rispostaMessaggio();
                });

                setTimeout(() => {
                    mediaRecorder.stop();
                    document.querySelector(".fas.fa-microphone").style.color = "#6b7376";
                }, 3000);                     
            });
        }
    }
});