/* ==========================================================================
   CONFIGURAZIONE DEL SITO — qui si collegano tutti i dati di Damiano.
   Lascia una voce vuota ('' o []) finché il dato non è disponibile:
   il sito mostrerà i segnaposto e non invierà nulla a destinatari inventati.
   ========================================================================== */
window.SITE_CONFIG = {

  /* Link WhatsApp, es. 'https://wa.me/39XXXXXXXXXX' (numero con prefisso, senza + né spazi) */
  whatsapp: 'https://wa.me/393484564142',

  /* Link al profilo Instagram, es. 'https://www.instagram.com/NOMEPROFILO/' */
  instagram: 'https://www.instagram.com/damiano_tropeapt/',

  /* Nome mostrato nei contatti, es. '@nomeprofilo' (facoltativo) */
  instagramHandle: '@damiano_tropeapt',

  /* Profilo TikTok (già impostato) */
  tiktok: 'https://www.tiktok.com/@damianotropea_pt',

  /* Destinazione del form (es. endpoint Formspree, webhook di un bot Telegram,
     script PHP...). Se vuoto, il form apre WhatsApp con il riepilogo
     (se il link WhatsApp è configurato). */
  formEndpoint: '',

  /* TESTIMONIANZE — da 2 a 6 foto fornite e AUTORIZZATE dai clienti.
     Copia i file in assets/img/testimonianze/ e aggiungi una voce per ciascuno:
       { src: 'assets/img/testimonianze/cliente-1.jpg', alt: 'Descrizione della foto', caption: 'Didascalia (facoltativa)' }
     Per un prima/dopo usa { before: '...', after: '...', alt, caption } (occupa 2 posti). I segnaposto vuoti non vengono più mostrati. */
  testimonials: [
    {
      before: 'assets/img/testimonianze/prima.jpg',
      after: 'assets/img/testimonianze/dopo.jpg',
      alt: 'Trasformazione di un cliente',
      caption: 'Prima e dopo: percorso di un cliente'
    }
  ],

  /* VIDEO TIKTOK — da 4 a 8 link dei video più visti, es.
       { url: 'https://www.tiktok.com/@damianotropea_pt/video/1234567890123456789', title: 'Titolo breve', thumb: 'assets/img/tiktok/video-1.jpg' }
     "thumb" (anteprima) e "title" sono facoltativi.
     Al clic il visitatore viene portato direttamente su TikTok.
     Con la lista vuota compaiono 6 segnaposto che rimandano al profilo. */
  tiktokVideos: [
    {
      url: 'https://www.tiktok.com/@damianotropea_pt/video/7667174741265927457',
      title: 'Non mollare mai',
      thumb: 'assets/img/tiktok/video-1.jpg'
    },
    {
      url: 'https://www.tiktok.com/@damianotropea_pt/video/7639348243624676640',
      title: 'Drop set: tecnica di intensità',
      thumb: 'assets/img/tiktok/video-2.jpg'
    },
    {
      url: 'https://www.tiktok.com/@damianotropea_pt/video/7644995233415056672',
      title: 'Ci vuole metodo?',
      thumb: 'assets/img/tiktok/video-3.jpg'
    },
    {
      url: 'https://www.tiktok.com/@damianotropea_pt/video/7649813142050049302',
      title: 'Per crescere muscolarmente',
      thumb: 'assets/img/tiktok/video-4.jpg'
    }
  ]
};
