import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { NuevosProveedores } from '../../model/nuevos-proveedores';
import { NuevosProveedoresService } from 'src/app/services/nuevos-proveedores.service';
import { IonSlides } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NgwWowService } from 'ngx-wow';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


interface Departamento {
  departament: string;
}

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.page.html',
  styleUrls: ['./proveedor.page.scss'],
})
export class ProveedorPage implements OnInit, OnDestroy  {
  
  private wowSubscription: Subscription;

  @ViewChild('slider') slider: IonSlides;

    public slideOpts = {
        'allowTouchMove': false,
        'autoplay': false
    };

    next() {
        this.slider.slideNext();
    }
    back() {
        this.slider.slidePrev();
    }
  registro: NuevosProveedores = new NuevosProveedores();
  submitted = false;

  


  constructor( private nuevoProveedorService: NuevosProveedoresService, public alertController: AlertController, private router: Router, private wowService: NgwWowService) { 
    
  
      this.wowService.init(); 
  }
  activarWow(){
    this.wowService.init();
  }

  ngOnInit() {
    this.wowSubscription = this.wowService.itemRevealed$.subscribe(
      (item:HTMLElement) => {
        // do whatever you want with revealed element
      });
  }
  ngOnDestroy() {
    // unsubscribe (if necessary) to WOW observable to prevent memory leaks
    this.wowSubscription.unsubscribe();
  }

  saveTutorial(): void {
    this.nuevoProveedorService.create(this.registro).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newRegistro(): void {
    this.submitted = false;
    location.reload();
    console.log("funciona");
    
  }
  
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar envio de solicitud!',
      message: 'Empezaremos un gran convenio, la cooperaci??n nos llevar?? mucho m??s lejos',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmar',
          handler: () => {
            this.saveTutorial();
            this.next();
            this.activarWow();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  regiones = [
    'Amazonas',
    'Antioquia',
    'Arauca',
    'Atl??ntico',
    'Bol??var',
    'Boyac??',
    'Caldas',
    'Caquet??',
    'Casanare',
    'Cauca',
    'Cesar',
    'Choc??',
    'C??rdoba',
    'Cundinamarca',
    'Guain??a',
    'Guaviare',
    'Huila',
    'La Guajira',
    'Magdalena',
    'Meta',
    'Nari??o',
    'Norte de Santander',
    'Putumayo',
    'Quind??o',
    'Risaralda',
    'San Andr??s y Providencia',
    'Santander',
    'Sucre',
    'Tolima',
    'Valle del Cauca',
    'Vaup??s',
    'Vichada',
  ]

  ciudades = []

  ciudadesSeleccion = {
    'Amazonas':['Leticia','El Encanto','La Chorrera','La Pedrera','La Victoria','Miriti - Paran??','Puerto Alegr??a','Puerto Arica','Puerto Nari??o','Puerto Santander','Tarapac??'],
    'Antioquia':['Medell??n','Abejorral','Abriaqu??','Alejandr??a','Amag??','Amalfi','Andes','Angel??polis','Angostura','Anor??','Anza','Apartad??','Arboletes','Argelia','Armenia','Barbosa','Bello','Belmira','Betania','Betulia','Brice??o','Buritic??','C??ceres','Caicedo','Caldas','Campamento','Ca??asgordas','Caracol??','Caramanta','Carepa','Carolina','Caucasia','Chigorod??','Cisneros','Ciudad Bol??var','Cocorn??','Concepci??n','Concordia','Copacabana','Dabeiba','Don Mat??as','Eb??jico','El Bagre','El Carmen de Viboral','El Pe??ol','El Retiro','El Santuario','Entrerrios','Envigado','Frontino','Giraldo','Girardota','G??mez Plata','Granada','Guadalupe','Guarne','Guatap??','Heliconia','Hispania','Itagui','Ituango','Jard??n','Jeric??','La Ceja','La Estrella','La Pintada','La Uni??n','Liborina','Maceo','Marinilla','Montebello','Murind??','Mutat??','Nari??o','Nech??','Necocl??','Olaya','Peque','Pueblorrico','Puerto Berr??o','Puerto Nare','Puerto Triunfo','Remedios','Rionegro','Sabanalarga','Sabaneta','Salgar','San Andr??s de Cuerqu??a','San Carlos','San Francisco','San Jer??nimo','San Jos?? de La Monta??a','San Juan de Urab??','San Luis','San Pedro','San Pedro de Uraba','San Rafael','San Roque','San Vicente','Santa B??rbara','Santa Rosa de Osos','Santaf?? de Antioquia','Santo Domingo','Segovia','Sonson','Sopetr??n','T??mesis','Taraz??','Tarso','Titirib??','Toledo','Turbo','Uramita','Urrao','Valdivia','Valpara??so','Vegach??','Venecia','Vig??a del Fuerte','Yal??','Yarumal','Yolomb??','Yond??','Zaragoza'],
    'Arauca':['Arauca','Arauquita','Cravo Norte','Fortul','Puerto Rond??n','Saravena','Tame'],
    'Atl??ntico':['Barranquilla','Baranoa','Campo de La Cruz','Candelaria','Galapa','Juan de Acosta','Luruaco','Malambo','Manat??','Palmar de Varela','Pioj??','Polonuevo','Ponedera','Puerto Colombia','Repel??n','Sabanagrande','Sabanalarga','Santa Luc??a','Santo Tom??s','Soledad','Suan','Tubar??','Usiacur??'],
    'Bol??var':['Cartagena de Indias','Ach??','Altos del Rosario','Arenal','Arjona','Arroyohondo','Barranco de Loba','Calamar','Cantagallo','Cicuco','Clemencia','C??rdoba','El Carmen de Bol??var','El Guamo','El Pe????n','Hatillo de Loba','Magangu??','Mahates','Margarita','Mar??a La Baja','Montecristo','Morales','Noros??','Pinillos','Regidor','R??o Viejo','San Crist??bal','San Estanislao','San Fernando','San Jacinto','San Jacinto del Cauca','San Juan Nepomuceno','San Mart??n de Loba','San Pablo','Santa Catalina','Santa Cruz de Mompox','Santa Rosa','Santa Rosa del Sur','Simit??','Soplaviento','Talaigua Nuevo','Tiquisio','Turbaco','Turban??','Villanueva','Zambrano'],
    'Boyac??':['Tunja','Almeida','Aquitania','Arcabuco','Bel??n','Berbeo','Bet??itiva','Boavita','Boyac??','Brice??o','Buenavista','Busbanz??','Caldas','Campohermoso','Cerinza','Chinavita','Chiquinquir??','Ch??quiza','Chiscas','Chita','Chitaraque','Chivat??','Chivor','Ci??nega','C??mbita','Coper','Corrales','Covarach??a','Cubar??','Cucaita','Cu??tiva','Duitama','El Cocuy','El Espino','Firavitoba','Floresta','Gachantiv??','Gameza','Garagoa','Guacamayas','Guateque','Guayat??','G??ic??n','Iza','Jenesano','Jeric??','La Capilla','La Uvita','La Victoria','Labranzagrande','Macanal','Marip??','Miraflores','Mongua','Mongu??','Moniquir??','Motavita','Muzo','Nobsa','Nuevo Col??n','Oicat??','Otanche','Pachavita','P??ez','Paipa','Pajarito','Panqueba','Pauna','Paya','Paz de R??o','Pesca','Pisba','Puerto Boyac??','Qu??pama','Ramiriqu??','R??quira','Rond??n','Saboy??','S??chica','Samac??','San Eduardo','San Jos?? de Pare','San Luis de Gaceno','San Mateo','San Miguel de Sema','San Pablo de Borbur','Santa Mar??a','Santa Rosa de Viterbo','Santa Sof??a','Santana','Sativanorte','Sativasur','Siachoque','Soat??','Socha','Socot??','Sogamoso','Somondoco','Sora','Sorac??','Sotaquir??','Susac??n','Sutamarch??n','Sutatenza','Tasco','Tenza','Tiban??','Tibasosa','Tinjac??','Tipacoque','Toca','Tog????','T??paga','Tota','Tunungu??','Turmequ??','Tuta','Tutaz??','Umbita','Ventaquemada','Villa de Leyva','Viracach??','Zetaquira'],
    'Caldas':['Manizales','Aguadas','Anserma','Aranzazu','Belalc??zar','Chinchin??','Filadelfia','La Dorada','La Merced','Manzanares','Marmato','Marquetalia','Marulanda','Neira','Norcasia','P??cora','Palestina','Pensilvania','Riosucio','Risaralda','Salamina','Saman??','San Jos??','Sup??a','Victoria','Villamar??a','Viterbo'],
    'Caquet??':['Florencia','Albania','Bel??n de Los Andaquies','Cartagena del Chair??','Curillo','El Doncello','El Paujil','La Monta??ita','Mil??n','Morelia','Puerto Rico','San Jos?? del Fragua','San Vicente del Cagu??n','Solano','Solita','Valpara??so'],
    'Casanare':['Yopal','Aguazul','Ch??meza','Hato Corozal','La Salina','Man??','Monterrey','Nunch??a','Orocu??','Paz de Ariporo','Pore','Recetor','Sabanalarga','S??cama','San Luis de Palenque','T??mara','Tauramena','Trinidad','Villanueva'],
    'Cauca':['Popay??n','Almaguer','Argelia','Balboa','Bol??var','Buenos Aires','Cajib??o','Caldono','Caloto','Corinto','El Tambo','Florencia','Guachen??','Guap??','Inz??','Jambal??','La Sierra','La Vega','L??pez de Micay','Mercaderes','Miranda','Morales','Padilla','P??ez','Pat??a','Piamonte','Piendam??','Puerto Tejada','Purac??','Rosas','San Sebasti??n','Santander de Quilichao','Santa Rosa','Silvia','Sotar??','Su??rez','Sucre','Timb??o','Timbiqu??','Torib??o','Totor??','Villa Rica'],
    'Cesar':['Valledupar','Aguachica','Agust??n Codazzi','Astrea','Becerril','Bosconia','Chimichagua','Chiriguan??','Curuman??','El Copey','El Paso','Gamarra','Gonz??lez','La Gloria','La Jagua de Ibirico','La Paz','Manaure Balc??n del Cesar','Pailitas','Pelaya','Pueblo Bello','R??o de Oro','San Alberto','San Diego','San Mart??n','Tamalameque'],
    'Choc??':['Quibd??','Acand??','Alto Baud??','Atrato','Bagad??','Bah??a Solano','Bajo Baud??','Bojay??','C??rtegui','Condoto','El Cant??n de San Pablo','El Carmen de Atrato','El Carmen del Dari??n','El Litoral de San Juan','Istmina','Jurad??','Llor??','Medio Atrato','Medio Baud??','Medio San Juan','N??vita','Nuqu??','R??o Ir??','R??o Quito','Riosucio','San Jos?? del Palmar','Sip??','Tad??','Ungu??a','Uni??n Panamericana'],
    'C??rdoba':['Monter??a','Ayapel','Buenavista','Canalete','Ceret??','Chim??','Chin??','Ci??naga de Oro','Cotorra','La Apartada','Los C??rdobas','Momil','Montel??bano','Mo??itos','Planeta Rica','Pueblo Nuevo','Puerto Escondido','Puerto Libertador','Pur??sima','Sahag??n','San Andr??s de Sotavento','San Antero','San Bernardo del Viento','San Carlos','San Jos?? de Ur??','San Pelayo','Santa Cruz de Lorica','Tierralta','Tuch??n','Valencia'],
    'Cundinamarca':['Bogot??','Agua de Dios','Alb??n','Anapoima','Anolaima','Apulo','Arbel??ez','Beltr??n','Bituima','Bojac??','Cabrera','Cachipay','Cajic??','Caparrap??','C??queza','Carmen de Carupa','Chaguan??','Ch??a','Chipaque','Choach??','Chocont??','Cogua','Cota','Cucunub??','El Colegio','El Pe????n','El Rosal','Facatativ??','F??meque','Fosca','Funza','F??quene','Fusagasug??','Gachal??','Gachancip??','Gachet??','Gama','Girardot','Granada','Guachet??','Guaduas','Guasca','Guataqu??','Guatavita','Guayabal de S??quima','Guayabetal','Guti??rrez','Jerusal??n','Jun??n','La Calera','La Mesa','La Palma','La Pe??a','La Vega','Lenguazaque','Machet??','Madrid','Manta','Medina','Mosquera','Nari??o','Nemoc??n','Nilo','Nimaima','Nocaima','Pacho','Paime','Pandi','Paratebueno','Pasca','Puerto Salgar','Pul??','Quebradanegra','Quetame','Quipile','Ricaurte','San Antonio del Tequendama','San Bernardo','San Cayetano','San Francisco','San Juan de Rioseco','Sasaima','Sesquil??','Sibat??','Silvania','Simijaca','Soacha','Sop??','Subachoque','Suesca','Supat??','Susa','Sutatausa','Tabio','Tausa','Tena','Tenjo','Tibacuy','Tibirita','Tocaima','Tocancip??','Topaip??','Ubal??','Ubaque','Ubat??','Une','??tica','Venecia','Vergara','Vian??','Villag??mez','Villapinz??n','Villeta','Viot??','Yacop??','Zipac??n','Zipaquir??'],
    'Guain??a':['In??rida','Barranco Minas','Mapiripana','San Felipe','Puerto Colombia','La Guadalupe','Cacahual','Pana Pana','Morichal'],
    'Guaviare':['San Jos?? del Guaviare','Calamar','El Retorno','Miraflores'],
    'Huila':['Neiva','Acevedo','Agrado','Aipe','Algeciras','Altamira','Baraya','Campoalegre','Colombia','El??as','Garz??n','Gigante','Guadalupe','Hobo','??quira','Isnos','La Argentina','La Plata','N??taga','Oporapa','Paicol','Palermo','Palestina','Pital','Pitalito','Rivera','Saladoblanco','San Agust??n','Santa Mar??a','Suaza','Tarqui','Tello','Teruel','Tesalia','Timan??','Villavieja','Yaguar??'],
    'La Guajira':['Riohacha','Albania','Barrancas','Dibulla','Distracci??n','El Molino','Fonseca','Hatonuevo','La Jagua del Pilar','Maicao','Manaure','San Juan del Cesar','Uribia','Urumita','Villanueva'],
    'Magdalena':['Santa Marta','Algarrobo','Aracataca','Ariguan??','Cerro San Antonio','Chivolo','Ci??naga','Concordia','El Banco','El Pi??on','El Ret??n','Fundaci??n','Guamal','Nueva Granada','Pedraza','Piji??o del Carmen','Pivijay','Plato','Puebloviejo','Remolino','Sabanas de San Angel','Salamina','San Sebasti??n de Buenavista','San Zen??n','San Zen??n','Santa Ana','Santa B??rbara de Pinto','Sitionuevo','Tenerife','Zapay??n','Zona Bananera'],
    'Meta':['Villavicencio','Acac??as','Barranca de Up??a','Cabuyaro','Castilla La Nueva','Cubarral','Cumaral','El Calvario','El Castillo','El Dorado','Fuente de Oro','Granada','Guamal','La Macarena','Lejan??as','Mapirip??n','Mesetas','Puerto Concordia','Puerto Gait??n','Puerto Lleras','Puerto L??pez','Puerto Rico','Restrepo','San Carlos de Guaroa','San Juan de Arama','San Juanito','San Mart??n','Uribe','Vista Hermosa'],
    'Nari??o':['Pasto','Alb??n','Aldana','Ancuya','Arboleda','Barbacoas','Bel??n','Buesaco','Chachag????','Col??n','Consac??','Contadero','C??rdoba','Cuaspud','Cumbal','Cumbitara','El Charco','El Pe??ol','El Rosario','El Tabl??n de G??mez','El Tambo','Francisco Pizarro','Funes','Guachucal','Guaitarilla','Gualmat??n','Iles','Imu??s','Ipiales','La Cruz','La Florida','La Llanada','La Tola','La Uni??n','Leiva','Linares','Los Andes','Mag???? Pay??n','Mallama','Mosquera','Nari??o','Olaya Herrera','Ospina','Policarpa','Potos??','Providencia','Puerres','Pupiales','Ricaurte','Roberto Pay??n','Samaniego','San Bernardo','San Lorenzo','San Pablo','San Pedro de Cartago','Sandon??','Santa B??rbara','Santacruz','Sapuyes','Taminango','Tangua','Tumaco','T??querres','Yacuanquer'],
    'Norte de Santander':['C??cuta','??brego','Arboledas','Bochalema','Bucarasica','C??chira','C??cota','Chin??cota','Chitag??','Convenci??n','Cucutilla','Durania','El Carmen','El Tarra','El Zulia','Gramalote','Hacar??','Herr??n','La Esperanza','La Playa de Bel??n','Labateca','Los Patios','Lourdes','Mutiscua','Oca??a','Pamplona','Pamplonita','Puerto Santander','Ragonvalia','Salazar de Las Palmas','San Calixto','San Cayetano','Santiago','Santo Domingo de Silos','Sardinata','Teorama','Tib??','Toledo','Villa Caro','Villa del Rosario'],
    'Putumayo':['Mocoa','Col??n','Orito','Puerto As??s','Puerto Caicedo','Puerto Guzm??n','Puerto Legu??zamo','San Francisco','San Miguel','Santiago','Sibundoy','Valle del Guamuez','Villagarz??n'],
    'Quind??o':['Armenia','Buenavista','Calarca','Circasia','C??rdoba','Filandia','G??nova','La Tebaida','Montenegro','Pijao','Quimbaya','Salento'],
    'Risaralda':['Pereira','Ap??a','Balboa','Bel??n de Umbr??a','Dosquebradas','Gu??tica','La Celia','La Virginia','Marsella','Mistrat??','Pueblo Rico','Quinch??a','Santa Rosa de Cabal','Santuario'],
    'San Andr??s y Providencia':['San Andr??s','Providencia','Santa Catalina','Cayos'],
    'Santander':['Bucaramanga','Aguada','Albania','Aratoca','Barbosa','Barichara','Barrancabermeja','Betulia','Bol??var','Cabrera','California','Capitanejo','Carcas??','Cepit??','Cerrito','Charal??','Charta','Chima','Chipat??','Cimitarra','Concepci??n','Confines','Contrataci??n','Coromoro','Curit??','El Carmen de Chucur??','El Guacamayo','El Pe????n','El Play??n','Encino','Enciso','Flori??n','Floridablanca','Gal??n','G??mbita','Gir??n','Guaca','Guadalupe','Guapot??','Guavat??','G??epsa','Hato','Jes??s Mar??a','Jord??n','La Belleza','La Paz','Land??zuri','Lebrija','Los Santos','Macaravita','M??laga','Matanza','Mogotes','Molagavita','Ocamonte','Oiba','Onzaga','Palmar','Palmas del Socorro','P??ramo','Piedecuesta','Pinchote','Puente Nacional','Puerto Parra','Puerto Wilches','Rionegro','Sabana de Torres','San Andr??s','San Benito','San Gil','San Joaqu??n','San Jos?? de Miranda','San Miguel','San Vicente de Chucur??','Santa B??rbara','Santa Helena del Op??n','Simacota','Socorro','Suaita','Sucre','Surat??','Tona','Valle de San Jos??','V??lez','Vetas','Villanueva','Zapatoca'],
    'Sucre':['Sincelejo','Buenavista','Caimito','Chal??n','Colos??','Corozal','Cove??as','El Roble','Galeras','Guaranda','La Uni??n','Los Palmitos','Majagual','Morroa','Ovejas','Palmito','Sampu??s','San Benito Abad','San Juan de Betulia','San Marcos','San Onofre','San Pedro','Santiago de Tol??','Sinc??','Sucre','Tol??viejo'],
    'Tolima':['Ibagu??','Alpujarra','Alvarado','Ambalema','Anzo??tegui','Armero','Ataco','Cajamarca','Carmen de Apical??','Casabianca','Chaparral','Coello','Coyaima','Cunday','Dolores','Espinal','Falan','Flandes','Fresno','Guamo','Herveo','Honda','Icononzo','L??rida','L??bano','Mariquita','Melgar','Murillo','Natagaima','Ortega','Palocabildo','Piedras','Planadas','Prado','Purificaci??n','Rioblanco','Roncesvalles','Rovira','Salda??a','San Antonio','San Luis','Santa Isabel','Su??rez','Valle de San Juan','Venadillo','Villahermosa','Villarrica'],
    'Valle del Cauca':['Cali','Alcal??','Andaluc??a','Ansermanuevo','Argelia','Bol??var','Buenaventura','Buga','Bugalagrande','Caicedonia','Calima - El Dari??n','Candelaria','Cartago','Dagua','El ??guila','El Cairo','El Cerrito','El Dovio','Florida','Ginebra','Guacar??','Jamund??','La Cumbre','La Uni??n','La Victoria','Obando','Palmira','Pradera','Restrepo','Riofr??o','Roldanillo','San Pedro','Sevilla','Toro','Trujillo','Tulu??','Ulloa','Versalles','Vijes','Yotoco','Yumbo','Zarzal'],
    'Vaup??s':['Mit??','Caruru','Pacoa','Taraira','Papunaua','Yavarat??'],
    'Vichada':['Puerto Carre??o','Cumaribo','La Primavera','Santa Rosal??a'],

  } 


  cambioRegion(dato){
    //Aqui va tu logica de consulta a la BD

    this.ciudades = this.ciudadesSeleccion[dato]
  }

  departamentos: Departamento[] = [
    { departament: 'Amazonas'},
    { departament: 'Antioquia'},
    { departament: 'Arauca'},
    { departament: 'Atl??ntico'},
    { departament: 'Bol??var'},
    { departament: 'Boyac??'},
    { departament: 'Caldas'},
    { departament: 'Caquet??'},
    { departament: 'Casanare'},
    { departament: 'Cauca'},
    { departament: 'Cesar'},
    { departament: 'Choc??'},
    { departament: 'C??rdoba'},
    { departament: 'Cundinamarca'},
    { departament: 'Guain??a'},
    { departament: 'Guaviare'},
    { departament: 'Huila'},
    { departament: 'La Guajira'},
    { departament: 'Magdalena'},
    { departament: 'Meta'},
    { departament: 'Nari??o'},
    { departament: 'Norte de Santander'},
    { departament: 'Putumayo'},
    { departament: 'Quind??o'},
    { departament: 'Risaralda'},
    { departament: 'San Andr??s y Providencia'},
    { departament: 'Santander'},
    { departament: 'Sucre'},
    { departament: 'Tolima'},
    { departament: 'Valle del Cauca'},
    { departament: 'Vaup??s'},
    { departament: 'Vichada'}

  ];

}
