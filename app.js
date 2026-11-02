(function(){
"use strict";
// ================= Conteúdo =================
const AREAS=[{k:'cm',nome:'Clínica Médica'},{k:'cir',nome:'Cirurgia'},{k:'ped',nome:'Pediatria'},{k:'go',nome:'Ginecologia e Obstetrícia'},{k:'prev',nome:'Preventiva'}];
const CURTA={cm:'Clínica',cir:'Cirurgia',ped:'Pediatria',go:'GO',prev:'Preventiva'};
const NOME=Object.fromEntries(AREAS.map(a=>[a.k,a.nome]));
// [ciclo, área, tema, subtemas (para buscar no drive), prioridade 3 alta / 2 média / 1 baixa, dias]
const TEMAS=[
// ---------- CLÍNICA MÉDICA · ciclo 1 (alta incidência) ----------
[1,'cm','Eletrocardiograma (ECG) básico',['Ritmo sinusal','Eixo','Sobrecargas','Bloqueios de ramo','Isquemia no ECG'],3,1],
[1,'cm','Arritmias: taquiarritmias e bradiarritmias',['Fibrilação atrial','Flutter','TSV','Taquicardia ventricular','BAV','Marca-passo','Anticoagulação na FA'],3,2],
[1,'cm','PCR, ACLS e síncope',['Ritmos chocáveis','Cuidados pós-PCR','Síncope'],3,1],
[1,'cm','Insuficiência cardíaca',['IC com FE reduzida','IC aguda','Choque cardiogênico','Cardiomiopatias'],3,2],
[1,'cm','Hipertensão arterial sistêmica',['Tratamento','Crise hipertensiva','HAS secundária'],3,2],
[1,'cm','Síndromes coronarianas agudas e angina',['IAM com supra de ST','SCA sem supra','Angina estável','Complicações pós-IAM'],3,2],
[1,'cm','Diabetes mellitus',['Diagnóstico','Antidiabéticos e insulina','Complicações crônicas','Pé diabético'],3,2],
[1,'cm','Tireoide: hipotireoidismo e tireotoxicose',['Hashimoto','Graves','Tireoidites','Crise tireotóxica'],3,1],
[1,'cm','Distúrbios do sódio e do potássio',['Hiponatremia','Hipernatremia','Hipercalemia','Hipocalemia'],3,1],
[1,'cm','Glomerulopatias: síndrome nefrítica e nefrótica',['GNPE','GNRP','Lesão mínima','Nefropatia membranosa'],3,1],
[1,'cm','Pneumonia adquirida na comunidade e derrame pleural',['CURB-65','Antibioticoterapia','Empiema'],3,1],
[1,'cm','Tuberculose',['Diagnóstico','Esquema RIPE','TB latente','TB extrapulmonar','TB-HIV'],3,2],
[1,'cm','HIV/aids e infecções oportunistas',['TARV','Pneumocistose','Neurotoxoplasmose','Criptococose','Profilaxias'],3,2],
[1,'cm','Meningites e encefalites',['Líquor','Meningite bacteriana','Meningoencefalite herpética','Quimioprofilaxia'],3,1],
[1,'cm','Sepse e choque séptico',['Critérios','Bundle da 1ª hora','Vasopressores'],3,1],
[1,'cm','Infecções relacionadas à assistência à saúde (IRAS)',['Infecção de cateter','PAV','ITU associada a sonda','Precauções','Antibióticos'],3,1],
[1,'cm','Asma e DPOC',['Classificação','Tratamento de manutenção','Exacerbação','Espirometria'],3,1],
[1,'cm','Tromboembolismo pulmonar e TVP',['Wells','D-dímero','Anticoagulação','Trombólise'],3,1],
[1,'cm','DRGE, dispepsia e H. pylori',['Esôfago de Barrett','Úlcera péptica','Erradicação do H. pylori'],3,1],
[1,'cm','Hemorragia digestiva alta e baixa',['Varicosa','Não varicosa','Escore de Glasgow-Blatchford','HDB'],3,1],
[1,'cm','Pancreatite aguda e crônica',['Critérios de Atlanta','Ranson','Complicações'],3,1],
[1,'cm','Hepatites virais',['Hepatite B','Hepatite C','Hepatite A','Sorologias'],3,1],
[1,'cm','Cirrose e suas complicações',['Ascite','PBE','Encefalopatia hepática','Hipertensão portal','Síndrome hepatorrenal'],3,2],
[1,'cm','Anemias: carenciais e hemolíticas',['Ferropriva','Megaloblástica','Doença crônica','Anemia falciforme','Talassemias','Esferocitose'],3,2],
[1,'cm','AVC isquêmico, hemorrágico e AIT',['Trombólise','Trombectomia','HSA','Prevenção secundária'],3,1],
[1,'cm','Cefaleias, coma e alterações da consciência',['Enxaqueca','Cefaleia em salvas','Sinais de alarme','Escala de Glasgow','Morte encefálica'],3,1],
// ---------- CLÍNICA MÉDICA · ciclo 2 ----------
[2,'cm','Lesão renal aguda e doença renal crônica',['Pré-renal x NTA','Indicações de diálise','Estadiamento da DRC'],2,1],
[2,'cm','Distúrbios ácido-base',['Ânion gap','Delta-delta','Compensação'],2,1],
[2,'cm','Emergências do diabetes e dislipidemia',['Cetoacidose diabética','Estado hiperosmolar','Hipoglicemia','Estatinas'],2,1],
[2,'cm','Adrenal, hipófise e metabolismo do cálcio',['Cushing','Addison','Hiperaldosteronismo','Feocromocitoma','Prolactinoma','Hiperparatireoidismo','Osteoporose'],2,1],
[2,'cm','Valvopatias, endocardite e pericardite',['Estenose aórtica','Insuficiência mitral','Critérios de Duke','Tamponamento'],2,2],
[2,'cm','Doenças inflamatórias intestinais e diarreias',['Crohn','Retocolite ulcerativa','Diarreia crônica','Colite pseudomembranosa','Doença celíaca'],2,1],
[2,'cm','Leucemias, linfomas e mieloma múltiplo',['LMA','LLA','LMC','LLC','Hodgkin','Mieloma'],2,1],
[2,'cm','Hemostasia, trombofilias e transfusão',['PTI','PTT','CIVD','Hemofilia','Anticoagulantes','Hemotransfusão'],2,1],
[2,'cm','Artrite reumatoide e espondiloartrites',['Critérios ACR/EULAR','Espondilite anquilosante','Artrite psoriásica','DMARDs'],2,1],
[2,'cm','Lúpus, vasculites e outras colagenoses',['LES','Síndrome antifosfolípide','Esclerodermia','Sjögren','Arterite de células gigantes','Poliangeíte'],2,1],
[2,'cm','Gota, febre reumática e artrites infecciosas',['Gota','Pseudogota','Artrite séptica','Febre reumática'],1,1],
[2,'cm','Epilepsia e estado de mal epiléptico',['Crises focais e generalizadas','Anticonvulsivantes'],2,1],
[2,'cm','Demências, Parkinson e doenças neuromusculares',['Alzheimer','Doença de Parkinson','Miastenia gravis','Guillain-Barré','Polineuropatias'],2,1],
[2,'cm','Câncer de pulmão, nódulo pulmonar e doenças intersticiais',['Nódulo pulmonar solitário','Sarcoidose','Fibrose pulmonar','Tumores do mediastino'],2,1],
[2,'cm','Síndromes febris e arboviroses',['Dengue','Chikungunya','Zika','Febre amarela','Malária','Leptospirose','Febre maculosa'],2,2],
[2,'cm','Doença de Chagas, leishmaniose, parasitoses e animais peçonhentos',['Chagas','Leishmaniose visceral','Esquistossomose','Parasitoses intestinais','Acidente ofídico','Escorpionismo'],2,1],
[2,'cm','Hanseníase e sífilis adquirida',['Classificação operacional','Reações hansênicas','Sífilis primária, secundária e terciária'],2,1],
[2,'cm','Psiquiatria: humor, ansiedade e suicídio',['Depressão','Transtorno bipolar','Transtornos de ansiedade','Risco de suicídio','Antidepressivos'],2,1],
[2,'cm','Psiquiatria: psicoses, álcool e drogas, transtornos alimentares',['Esquizofrenia','Antipsicóticos','Abstinência alcoólica','Delirium tremens','Anorexia e bulimia'],2,1],
[2,'cm','Intoxicações exógenas',['Antídotos','Organofosforados','Paracetamol','Benzodiazepínicos'],2,1],
[2,'cm','Geriatria: síndromes geriátricas e delirium',['Quedas','Polifarmácia','Critérios de Beers','Delirium','Fragilidade'],2,1],
[2,'cm','Dermatologia',['Lesões elementares','Piodermites','Micoses','Farmacodermias','Câncer de pele'],1,1],
// ---------- CIRURGIA · ciclo 1 ----------
[1,'cir','Trauma: ATLS, via aérea e trauma torácico',['Avaliação primária ABCDE','Via aérea definitiva','Pneumotórax hipertensivo','Hemotórax','Tamponamento'],3,2],
[1,'cir','Trauma abdominal, pélvico e choque hemorrágico',['FAST','Lavado peritoneal','Lesões de baço e fígado','Fratura de pelve','Classes de choque'],3,1],
[1,'cir','TCE e trauma raquimedular',['Escala de Glasgow','Hematoma epidural x subdural','Hipertensão intracraniana'],3,1],
[1,'cir','Pré-operatório, risco cirúrgico e complicações pós-operatórias',['Avaliação pré-operatória','Febre pós-operatória','Deiscência','Fístulas','Profilaxia de TEV'],3,2],
[1,'cir','Abdome agudo inflamatório: apendicite e diverticulite',['Alvarado','Diverticulite complicada','Classificação de Hinchey'],3,1],
[1,'cir','Colelitíase, colecistite, coledocolitíase e colangite',['Tríade de Charcot','CPRE','Colecistectomia'],3,2],
[1,'cir','Abdome agudo obstrutivo e vascular',['Obstrução intestinal','Volvo','Isquemia mesentérica'],3,1],
[1,'cir','Hérnias da parede abdominal',['Inguinal','Femoral','Umbilical','Incisional','Encarcerada x estrangulada'],3,1],
[1,'cir','Queimaduras',['Regra dos 9','Parkland','Lesão inalatória'],3,1],
[1,'cir','Urologia: litíase, HPB, infecções e escroto agudo',['Cólica renal','Hiperplasia prostática','Torção testicular','Pielonefrite'],3,1],
// ---------- CIRURGIA · ciclo 2 ----------
[2,'cir','Câncer colorretal e doenças orificiais',['Rastreamento','Poliposes','Hemorroidas','Fissura','Fístula anal'],2,1],
[2,'cir','Câncer de esôfago e estômago, megaesôfago',['Acalasia','Adenocarcinoma gástrico','GIST'],2,1],
[2,'cir','Tumores de pâncreas, periampulares e fígado',['Adenocarcinoma de pâncreas','Tumores periampulares','Hepatocarcinoma','Tumores hepáticos benignos'],2,1],
[2,'cir','Urologia oncológica: próstata, rim, bexiga e testículo',['PSA','Câncer de próstata','Câncer renal','Câncer de bexiga'],2,1],
[2,'cir','Cirurgia vascular: DAP, aneurisma de aorta e varizes',['Claudicação','Isquemia aguda de membro','Aneurisma de aorta abdominal'],2,1],
[2,'cir','Anestesiologia',['Anestésicos locais','Intubação','Hipertermia maligna','Classificação ASA'],2,1],
[2,'cir','Cirurgia pediátrica',['Estenose hipertrófica de piloro','Invaginação intestinal','Hérnias na infância','Criptorquidia','Atresias'],2,1],
[2,'cir','Tireoide cirúrgica, paratireoide e cabeça e pescoço',['Nódulo de tireoide','Câncer de tireoide','PAAF','Massas cervicais'],2,1],
[2,'cir','Nutrição e resposta metabólica ao trauma',['Terapia nutricional','Síndrome de realimentação','Fios de sutura e cicatrização'],1,1],
[2,'cir','Ortopedia: fraturas e urgências',['Fraturas expostas','Síndrome compartimental','Ortopedia pediátrica'],1,1],
[2,'cir','Otorrinolaringologia e oftalmologia',['Rinossinusite','Epistaxe','Olho vermelho','Glaucoma agudo'],1,1],
// ---------- PEDIATRIA · ciclo 1 ----------
[1,'ped','Reanimação neonatal e distúrbios respiratórios do RN',['Golden minute','Taquipneia transitória','Doença da membrana hialina','Aspiração de mecônio'],3,1],
[1,'ped','Icterícia neonatal',['Hiperbilirrubinemia indireta','Fototerapia','Doença hemolítica'],3,1],
[1,'ped','Triagem neonatal, alojamento conjunto e exame do RN',['Teste do pezinho','Teste do coraçãozinho','Teste do olhinho','Reflexos primitivos'],3,1],
[1,'ped','Imunizações',['Calendário vacinal','Eventos adversos','Contraindicações','Profilaxia da raiva','Profilaxia do tétano'],3,2],
[1,'ped','Aleitamento materno e alimentação complementar',['Contraindicações ao aleitamento','Técnica de amamentação','Introdução alimentar'],3,1],
[1,'ped','Crescimento e desenvolvimento',['Curvas da OMS','Marcos do desenvolvimento','Baixa estatura'],3,1],
[1,'ped','Diarreia aguda e desidratação',['Planos A, B e C','Soro de reidratação','Disenteria'],3,1],
[1,'ped','Bronquiolite, sibilância e asma na infância',['Vírus sincicial respiratório','Lactente sibilante','Crise de asma'],3,1],
[1,'ped','Pneumonia na infância',['Etiologia por idade','Critérios de internação','Derrame parapneumônico'],3,1],
[1,'ped','IVAS: otite, faringite, sinusite e laringite',['Otite média aguda','Faringoamigdalite estreptocócica','Crupe','Epiglotite'],3,1],
[1,'ped','Emergências pediátricas: PCR, choque e sepse',['PALS','Choque na infância','Sepse pediátrica'],3,1],
// ---------- PEDIATRIA · ciclo 2 ----------
[2,'ped','Infecções congênitas e sepse neonatal',['Sífilis congênita','Toxoplasmose congênita','CMV','HIV na infância','Sepse precoce e tardia'],2,1],
[2,'ped','Prematuridade e distúrbios metabólicos do RN',['Hipoglicemia neonatal','Enterocolite necrosante','Displasia broncopulmonar'],2,1],
[2,'ped','Doenças exantemáticas',['Sarampo','Rubéola','Varicela','Escarlatina','Eritema infeccioso','Exantema súbito'],2,1],
[2,'ped','Febre sem sinais, meningite e ITU na infância',['Febre sem sinais localizatórios','Meningite na infância','ITU febril'],2,1],
[2,'ped','Desnutrição, obesidade e carências nutricionais',['Marasmo e kwashiorkor','Raquitismo','Hipovitaminose A'],2,1],
[2,'ped','Puberdade e adolescência',['Estágios de Tanner','Puberdade precoce','Atraso puberal'],2,1],
[2,'ped','Cardiopatias congênitas, Kawasaki e febre reumática',['Cardiopatias cianóticas e acianóticas','Doença de Kawasaki'],2,1],
[2,'ped','Nefrologia pediátrica: GNPE e síndrome nefrótica',['Glomerulonefrite pós-estreptocócica','Síndrome nefrótica na infância','Hipertensão na infância'],2,1],
[2,'ped','Onco-hematologia pediátrica',['Anemias na infância','Leucemias na infância','Tumor de Wilms','Neuroblastoma'],2,1],
[2,'ped','Imunodeficiências, alergia e fibrose cística',['Erros inatos da imunidade','Alergia à proteína do leite','Fibrose cística'],1,1],
[2,'ped','Maus-tratos, acidentes e neurodesenvolvimento',['Sinais de maus-tratos','Prevenção de acidentes','TEA','TDAH','Convulsão febril'],1,1],
// ---------- GO · ciclo 1 ----------
[1,'go','Ciclo menstrual e planejamento familiar',['Fisiologia do ciclo','Anticoncepção hormonal','DIU','Critérios de elegibilidade da OMS','Contracepção de emergência'],3,2],
[1,'go','Amenorreias e síndrome dos ovários policísticos',['Amenorreia primária','Amenorreia secundária','SOP','Hiperprolactinemia'],3,1],
[1,'go','Sangramento uterino anormal, miomatose e endometriose',['PALM-COEIN','Miomas','Endometriose','Adenomiose','Pólipos'],3,2],
[1,'go','Rastreamento e câncer do colo do útero',['Citologia','Colposcopia','NIC','HPV'],3,1],
[1,'go','Vulvovaginites, cervicites e DIP',['Candidíase','Vaginose bacteriana','Tricomoníase','Clamídia e gonorreia','Doença inflamatória pélvica'],3,1],
[1,'go','Pré-natal e modificações do organismo materno',['Exames do pré-natal','Diagnóstico de gravidez','Suplementação','Vacinas na gestação'],3,1],
[1,'go','Assistência ao parto: mecanismo, partograma e distocias',['Estática fetal','Pelvimetria','Períodos clínicos do parto','Partograma','Fórcipe e cesárea'],3,2],
[1,'go','Vitalidade fetal e cardiotocografia',['Cardiotocografia','Perfil biofísico fetal','Doppler'],3,1],
[1,'go','Síndromes hipertensivas da gestação',['Pré-eclâmpsia','Eclâmpsia','Síndrome HELLP','Sulfato de magnésio'],3,1],
[1,'go','Sangramentos da 1ª e da 2ª metade da gestação',['Abortamento','Gravidez ectópica','Doença trofoblástica','Placenta prévia','Descolamento prematuro de placenta'],3,1],
[1,'go','Hemorragia pós-parto e puerpério',['Atonia uterina','Uterotônicos','Infecção puerperal','Puerpério fisiológico'],3,1],
// ---------- GO · ciclo 2 ----------
[2,'go','Diabetes gestacional e doenças clínicas na gestação',['TOTG','Insulina na gestação','Tireoide na gestação','Cardiopatias na gestação'],2,1],
[2,'go','Infecções na gestação',['Sífilis na gestação','HIV na gestação','Toxoplasmose','Hepatite B','Estreptococo do grupo B'],2,1],
[2,'go','Prematuridade, RPMO e gemelaridade',['Trabalho de parto prematuro','Corticoide antenatal','Rotura prematura de membranas','Corionicidade'],2,1],
[2,'go','Ultrassom obstétrico, crescimento fetal e aloimunização',['Datação da gestação','Restrição de crescimento fetal','Isoimunização Rh'],2,1],
[2,'go','Climatério e terapia hormonal',['Síndrome climatérica','Contraindicações à TH','Osteoporose'],2,1],
[2,'go','Mama: lesões benignas, rastreamento e câncer',['Fibroadenoma','Mastalgia','Mamografia BI-RADS','Câncer de mama'],2,1],
[2,'go','Câncer de endométrio, ovário e massas anexiais',['Sangramento pós-menopausa','Tumores de ovário','CA-125'],2,1],
[2,'go','Infertilidade',['Investigação do casal','Reprodução assistida'],1,1],
[2,'go','Uroginecologia: incontinência urinária e prolapsos',['Incontinência de esforço','Bexiga hiperativa','POP-Q'],1,1],
[2,'go','Violência sexual, aborto legal e ética em GO',['Profilaxias pós-violência','Aborto previsto em lei'],1,1],
// ---------- PREVENTIVA · ciclo 1 ----------
[1,'prev','SUS: história, princípios, diretrizes e Leis 8.080 e 8.142',['Reforma sanitária','Universalidade, integralidade e equidade','Controle social','Conselhos e conferências'],3,2],
[1,'prev','Atenção Primária à Saúde, PNAB e Estratégia Saúde da Família',['Atributos da APS','Equipes de saúde da família','NASF/eMulti'],3,1],
[1,'prev','Indicadores de saúde e processo saúde-doença',['Mortalidade infantil','Coeficientes e taxas','História natural da doença'],3,1],
[1,'prev','Tipos de estudos epidemiológicos',['Coorte','Caso-controle','Transversal','Ensaio clínico','Ecológico'],3,2],
[1,'prev','Medidas de associação e de impacto',['Risco relativo','Odds ratio','Risco atribuível','NNT'],3,1],
[1,'prev','Testes diagnósticos',['Sensibilidade e especificidade','Valores preditivos','Razão de verossimilhança','Curva ROC'],3,1],
[1,'prev','Vigilância em saúde e notificação compulsória',['Vigilância epidemiológica','Lista de notificação','Vigilância sanitária'],3,1],
[1,'prev','Medicina de família: abordagem familiar e método clínico centrado na pessoa',['Genograma','Ecomapa','Ciclo de vida familiar','SOAP','MCCP'],3,1],
// ---------- PREVENTIVA · ciclo 2 ----------
[2,'prev','Financiamento, gestão, Decreto 7.508 e redes de atenção',['Financiamento da APS','Regionalização','Redes de atenção à saúde'],2,1],
[2,'prev','Epidemias, endemias e investigação de surtos',['Curva epidêmica','Diagrama de controle','Investigação de surto'],2,1],
[2,'prev','Bioestatística e medicina baseada em evidências',['Medidas de tendência central','Testes de hipótese','Valor de p','Intervalo de confiança','Metanálise'],2,2],
[2,'prev','Vieses, confundimento, causalidade e ensaios clínicos',['Critérios de Bradford Hill','Randomização','Fases dos ensaios clínicos'],2,1],
[2,'prev','Níveis de prevenção, rastreamentos e prevenção quaternária',['Prevenção primária a quaternária','Rastreamentos recomendados'],2,1],
[2,'prev','Saúde do trabalhador',['CAT','Doenças ocupacionais','Intoxicação por chumbo e benzeno'],2,1],
[2,'prev','Ética médica, bioética e documentos médicos',['Código de Ética Médica','Sigilo','Atestado','Declaração de óbito'],2,1],
[2,'prev','Transição demográfica, PNI e políticas de saúde',['Transição epidemiológica','Programa Nacional de Imunizações','Políticas de saúde mental, do idoso e da mulher'],1,1]
];
function ordenar(TEMAS){
  const AREAS=['cm','cir','ped','go','prev'];const out=[];let dia=0;
  for(const ciclo of [1,2]){
    const por={},ptr={},usado={},tot={};
    AREAS.forEach(a=>{por[a]=TEMAS.filter(t=>t[0]===ciclo&&t[1]===a);ptr[a]=0;usado[a]=0;tot[a]=por[a].reduce((s,t)=>s+t[5],0)});
    let ult=null;
    while(true){let best=null,bv=Infinity;
      for(const a of AREAS){if(ptr[a]>=por[a].length)continue;const t=por[a][ptr[a]];let v=(usado[a]+t[5]/2)/tot[a];if(a===ult)v+=.02;if(t[5]>1&&dia%5===4)v+=1;if(v<bv-1e-9){bv=v;best=a}}
      if(!best)break;const t=por[best][ptr[best]++];usado[best]+=t[5];ult=best;out.push(t);dia+=t[5]}
  }
  return out;
}
const PAT={3:[15,10,8,5,5],2:[10,8,5,5,5],1:[8,5,5,5,5]};
const PRIO={3:'alta incidência',2:'média incidência',1:'baixa incidência'};
const TOPICS=ordenar(TEMAS).map((x,i)=>({id:'t'+String(i+1).padStart(3,'0'),ciclo:x[0],area:x[1],nome:x[2],bonus:x[3],pr:x[4],pat:PAT[x[4]],patTxt:PAT[x[4]].join('-'),dias:x[5]}));
const TOPIC=Object.fromEntries(TOPICS.map(t=>[t.id,t]));
const LABEL={},BY_LABEL={},BY_NOME={};
TOPICS.forEach(t=>{LABEL[t.id]=t.nome+' · '+CURTA[t.area];BY_LABEL[LABEL[t.id]]=t.id;BY_NOME[t.nome.toLowerCase()]=t.id});
const SLOTS=[];TOPICS.forEach(t=>{for(let p=0;p<t.dias;p++)SLOTS.push({tid:t.id,part:p,of:t.dias})});
const STEPS=[{k:'pre',n:'Questões pré'},{k:'aula',n:'Aula'},{k:'res',n:'Resumo'},{k:'pos',n:'Questões pós'}];
const TIPO={livre:'Livre',pre:'Questões pré',pos:'Questões pós',rev:'Revisão'};
const bonusTxt=t=>t.bonus.map(esc).join(' · ');
const prioPill=t=>`<span class="pill ${t.pr===3?'hi':''}">${PRIO[t.pr]}</span>`;
const POR_SEMANA=5;
const ROT=['cm','cir','go','ped','cm','prev'];
const MOT={ns:'Não sabia o conteúdo',da:'Falta de atenção',in:'Interpretação / pegadinha'};
const MOT_DICA={ns:'A maior parte dos erros é de conteúdo: revise a teoria dos temas fracos antes de aumentar o volume de questões.',da:'A maior parte dos erros é de atenção: leia o enunciado até o fim, sublinhe "correta/incorreta" e confira antes de marcar.',in:'A maior parte dos erros é de interpretação: faça provas anteriores da banca e anote no caderno como cada uma costuma formular as questões.'};
const PROVAS=[{k:'enare',nome:'ENARE'},{k:'usp',nome:'USP-SP'},{k:'sus',nome:'SUS-SP'}];
const TCAT={t:'Teoria',q:'Questões',r:'Revisão'};
const QUAL={d:'Difícil',o:'Ok',f:'Fácil'};
const META_MIN=240;

// ================= Datas =================
const MES=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const DIA=['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'];
const pd=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(Date.UTC(y,m-1,d))};
const fd=d=>d.toISOString().slice(0,10);
const add=(s,n)=>{const d=pd(s);d.setUTCDate(d.getUTCDate()+n);return fd(d)};
const diff=(a,b)=>Math.round((pd(a)-pd(b))/864e5);
const hoje=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const curto=s=>{const d=pd(s);return d.getUTCDate()+' '+MES[d.getUTCMonth()]};
const longo=s=>curto(s)+' '+pd(s).getUTCFullYear();
const dow=s=>(pd(s).getUTCDay()+6)%7;
const segunda=s=>add(s,-dow(s));
const isDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s);
const hm=m=>{m=Math.round(m);return Math.floor(m/60)+' h '+String(m%60).padStart(2,'0')};

// ================= Estado =================
const S={cfg:{inicio:'2027-01-04',revMax:3,metaQ:8000,provas:{enare:'2027-09-12',usp:'2027-12-05',sus:'2027-12-12'}},prog:{},ag:{},questoes:[],simulados:[],erros:[],tempo:[],notas:{}};
let semana=null,modo='local',db=null,replanAberto=false,restorePend=null,qqOpen=null,lkOpen=null,sErr=[];
const ICS_OK=true;
const EDIT={questoes:null,simulados:null,erros:null};
let MODAL=null; // {t:'ficha',id} | {t:'fc'}
let FC=null;
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pct=(a,t)=>t?Math.round(a/t*1000)/10:null;
const pctClass=p=>p>=75?'pct-good':p>=60?'pct-warn':'pct-bad';
const errMsg=e=>e&&e.code==='quota_exceeded'?'Espaço cheio: apague registros antigos.':'Não foi possível salvar. Tente de novo.';
let toastT=null,toastFn=null;
function toast(msg,undo){
  const t=$('toast');$('toastMsg').textContent=msg;toastFn=undo||null;$('toastUndo').hidden=!undo;t.hidden=false;
  clearTimeout(toastT);toastT=setTimeout(()=>{t.hidden=true;toastFn=null},undo?7000:3200);
}
$('toastUndo').onclick=async()=>{const f=toastFn;toastFn=null;$('toast').hidden=true;if(f){try{await f();toast('Desfeito.')}catch(e){toast('Não foi possível desfazer.')}}};

// ================= Armazenamento =================
const LS='cronoR1-2027-v5';
function lsSave(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}
function lsLoad(){try{const v=JSON.parse(localStorage.getItem(LS)||'null');if(v)Object.assign(S,v)}catch(e){}}
function writer(fn){let run=false,dirty=false;const w=async()=>{dirty=true;if(run)return;run=true;while(dirty){dirty=false;try{await fn()}catch(e){toast(errMsg(e))}}run=false};w.busy=()=>run||dirty;return w}
const saveTemas=writer(async()=>{if(modo==='db')await db.doc('estudo/temas').set({p:S.prog,ag:S.ag});else lsSave()});
const saveCfg=writer(async()=>{if(modo==='db')await db.doc('estudo/config').set({cfg:S.cfg});else lsSave()});
const newId=()=>'l'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
async function addRec(col,obj){
  if(modo==='db'){const ref=db.collection(col).doc();await ref.set(obj);return ref.id}
  const id=newId();S[col].push(Object.assign({},obj,{id}));lsSave();render();return id;
}
async function putRec(col,id,obj){
  const body=Object.assign({},obj);delete body.id;
  if(modo==='db'){await db.collection(col).doc(id).set(body);return}
  const i=S[col].findIndex(r=>r.id===id);const rec=Object.assign({},body,{id});if(i>=0)S[col][i]=rec;else S[col].push(rec);lsSave();render();
}
async function delRec(col,id){
  if(modo==='db'){await db.collection(col).doc(id).delete();return}
  S[col]=S[col].filter(r=>r.id!==id);lsSave();render();
}
async function putNota(tid,obj){
  if(modo==='db'){await db.collection('notas').doc(tid).set(obj);return}
  S.notas[tid]=obj;lsSave();render();
}
function setStorage(ok,txt){$('storage').innerHTML='<span class="dot" style="background:var('+(ok?'--good':'--warn')+')"></span>'+esc(txt)}
function normCfg(c){const o={inicio:S.cfg.inicio,revMax:S.cfg.revMax||3,metaQ:S.cfg.metaQ||8000,provas:Object.assign({},S.cfg.provas)};if(c){if(isDate(c.inicio))o.inicio=c.inicio;if(+c.revMax>=1&&+c.revMax<=8)o.revMax=+c.revMax;if(+c.metaQ>=500&&+c.metaQ<=50000)o.metaQ=+c.metaQ;if(c.provas)PROVAS.forEach(p=>{if(isDate(c.provas[p.k]))o.provas[p.k]=c.provas[p.k]})}return o}
async function conectar(){
  db=await window.FBready;
  if(!db){modo='local';lsLoad();setStorage(false,'modo local: salvo só neste aparelho');render();return}
  modo='db';
  const status=()=>setStorage(navigator.onLine,navigator.onLine?'sincronizado':'offline: salvo no aparelho, sincroniza depois');
  status();window.addEventListener('online',status);window.addEventListener('offline',status);
  window.__fsErr=e=>{console.error(e);toast(e&&e.code==='permission-denied'?'Sem permissão para salvar. Confira as regras do Firestore.':'Não foi possível salvar no Firebase.')};
  const erro=e=>{console.error(e);setStorage(false,'erro ao ler o Firebase: confira as regras')};
  db.doc('estudo/config').onSnapshot(s=>{if(saveCfg.busy())return;const d=s.exists?s.data():null;if(d&&d.cfg)S.cfg=normCfg(d.cfg);semana=null;render()},erro);
  db.doc('estudo/temas').onSnapshot(s=>{if(saveTemas.busy())return;const d=s.exists?s.data():null;S.prog=d&&d.p?JSON.parse(JSON.stringify(d.p)):{};S.ag=d&&d.ag?JSON.parse(JSON.stringify(d.ag)):{};render()},erro);
  ['questoes','simulados','erros','tempo'].forEach(c=>db.collection(c).onSnapshot(q=>{S[c]=q.docs.map(d=>Object.assign({},d.data(),{id:d.id}));render()},erro));
  db.collection('notas').onSnapshot(q=>{const m={};q.docs.forEach(d=>m[d.id]=d.data());S.notas=m;render()},erro);
}

// ================= Cronograma: cálculo =================
const defDate=i=>add(S.cfg.inicio,Math.floor(i/POR_SEMANA)*7+(i%POR_SEMANA));
const sDate=i=>isDate(S.ag[i])?S.ag[i]:defDate(i);
const nSteps=p=>p&&p.st?STEPS.filter(x=>p.st[x.k]).length:0;
const slotDone=i=>{const s=SLOTS[i],p=S.prog[s.tid];if(!p)return false;if(p.d)return true;return nSteps(p)>=Math.ceil(STEPS.length*(s.part+1)/s.of)};
const dayHint=s=>s.of===1?'Dia único: questões pré, aula, resumo e questões pós':s.part===0?'Dia 1 de 2: questões pré e aula':'Dia 2 de 2: resumo e questões pós';
const temaFeito=id=>!!(S.prog[id]&&S.prog[id].d);
function fimTeoria(){let m=S.cfg.inicio;SLOTS.forEach((s,i)=>{const d=sDate(i);if(d>m)m=d});return m}
function provasOrd(){return PROVAS.map(p=>({...p,data:S.cfg.provas[p.k]})).filter(p=>isDate(p.data)).sort((a,b)=>a.data<b.data?-1:1)}
function faseDe(dt){
  if(dt<S.cfg.inicio)return 0;
  const fimSem=add(segunda(fimTeoria()),6),P=provasOrd();
  if(dt<=fimSem)return 1;
  if(P.length&&dt<P[0].data)return 2;
  if(P.length&&dt<=P[P.length-1].data)return 3;
  return 4;
}
const FASE_NOME=f=>{const P=provasOrd();return f===1?'Fase 1: teoria + questões':f===2?'Fase 2: revisão geral até '+(P[0]?P[0].nome:'a 1ª prova'):f===3?'Fase 3: reta final até '+(P.length?P[P.length-1].nome:'a última prova'):f===4?'Provas concluídas':'Antes do início'};
function totalSemanas(){const P=provasOrd();const ft=fimTeoria();const ult=P.length?P[P.length-1].data:ft;const fim=ult>ft?ult:ft;return Math.max(1,Math.floor(diff(fim,S.cfg.inicio)/7)+1)}
function semanaAtual(){return Math.max(0,Math.min(totalSemanas()-1,Math.floor(diff(hoje(),S.cfg.inicio)/7)))}
function slotsEm(dt){const r=[];SLOTS.forEach((s,i)=>{if(sDate(i)===dt)r.push(i)});return r}
function atrasados(){const h=hoje();const r=[];SLOTS.forEach((s,i)=>{if(!slotDone(i)&&sDate(i)<h)r.push(i)});return r}
function acertoPorTema(){const m={};S.questoes.forEach(q=>{if(!q.tema||!TOPIC[q.tema])return;const o=m[q.tema]||(m[q.tema]={f:0,c:0});o.f+=+q.feitas||0;o.c+=+q.acertos||0});return m}
function acertoPorArea(){const m={};AREAS.forEach(a=>m[a.k]={f:0,c:0});S.questoes.forEach(q=>{if(m[q.area]){m[q.area].f+=+q.feitas||0;m[q.area].c+=+q.acertos||0}});S.simulados.forEach(s=>AREAS.forEach(a=>{const x=s.areas&&s.areas[a.k];if(x){m[a.k].f+=+x.q||0;m[a.k].c+=+x.a||0}}));return m}
const nextWorkday=d=>{d=add(d,1);while(dow(d)>=5)d=add(d,1);return d};

// ---- revisões adaptativas ----
function getRv(p){
  if(!p||!p.d)return null;
  if(p.rv&&isDate(p.rv.next))return p.rv;
  const r=p.r||[],n=r.filter(Boolean).length; // migração do modelo fixo 1/7/30
  const tab=[[1,1],[7,7],[30,23],[90,60]][Math.min(n,3)];
  return {next:add(p.d,tab[0]),iv:tab[1],n,e:2.5,h:[]};
}
function nextIv(rv,q){
  const e=rv.e||2.5,iv=rv.iv||1;let n;
  if(q==='d')n=iv<=2?2:Math.round(iv*.6);
  else if(q==='o')n=iv<=1?7:Math.round(iv*e);
  else n=iv<=1?12:Math.round(iv*e*1.3);
  return Math.max(2,Math.min(120,n));
}
function revisoes(){
  const out=[];
  for(const [id,p] of Object.entries(S.prog)){
    if(!p||!TOPIC[id])continue;
    const rv=getRv(p);
    if(rv)out.push({id,t:'r',due:rv.next,n:rv.n||0,ref:!!rv.ref,rv});
    (p.x||[]).forEach((x,k)=>{if(x&&!x.f&&isDate(x.due))out.push({id,t:'x',k,due:x.due})});
  }
  return out.sort((a,b)=>a.due<b.due?-1:a.due>b.due?1:0);
}
// Limite de revisões por dia: distribui as pendentes a partir de hoje (seg a sáb),
// as mais antigas primeiro e, no empate, as de maior incidência. Não altera o dado salvo.
function revisoesAgendadas(){
  const h=hoje(),cap=S.cfg.revMax||3,L=revisoes(),cnt={};
  cnt[h]=revFeitasEm(h).length;
  L.sort((a,b)=>a.due<b.due?-1:a.due>b.due?1:(TOPIC[b.id].pr-TOPIC[a.id].pr)||(a.t==='x'?-1:1));
  L.forEach(r=>{let d=r.due<h?h:r.due;while(dow(d)===6||(cnt[d]||0)>=cap)d=add(d,1);cnt[d]=(cnt[d]||0)+1;r.ef=d});
  return L;
}
function revFeitasEm(dt){const r=[];for(const [id,p] of Object.entries(S.prog)){const rv=p&&p.rv;if(rv&&rv.h)rv.h.forEach(h=>{if(h.d===dt)r.push({id,q:h.q})})}return r}

// ---- progresso ----
const snap=()=>JSON.stringify({p:S.prog,ag:S.ag});
const restoreSnap=s=>{const o=JSON.parse(s);S.prog=o.p;S.ag=o.ag;render();saveTemas()};
function ensureProg(id){let p=S.prog[id];if(!p)p=S.prog[id]={};p.st=p.st||{};p.x=p.x||[];return p}
function limpaProg(id){const p=S.prog[id];if(p&&!p.d&&!nSteps(p)&&!(p.x&&p.x.length)&&!p.flag)delete S.prog[id]}
function marcaStep(id,k,on){
  const p=ensureProg(id);p.st[k]=on?hoje():null;
  if(nSteps(p)===STEPS.length){if(!p.d){p.d=hoje();p.rv={next:add(p.d,1),iv:1,n:0,e:2.5,h:[]};return 'done'}}
  else if(p.d){p.d=null;delete p.rv;return 'undone'}
  return '';
}
function toggleStep(id,k){
  const before=snap(),p=ensureProg(id),on=!p.st[k],st=STEPS.find(x=>x.k===k);
  const r=marcaStep(id,k,on);
  const msg=r==='done'?'Tema concluído. 1ª revisão amanhã.':r==='undone'?'Etapa desmarcada; revisões do tema removidas.':st.n+(on?' marcada.':' desmarcada.');
  limpaProg(id);render();saveTemas();toast(msg,()=>restoreSnap(before));
}
function toggleFlag(id){const before=snap(),p=ensureProg(id);p.flag=!p.flag;limpaProg(id);render();saveTemas();toast(p.flag?'Marcada como “preciso rever”.':'Marca removida.',()=>restoreSnap(before))}
function rate(id,q){
  const p=S.prog[id];if(!p||!p.d)return;
  const before=snap();
  const rv=getRv(p);p.rv=rv;delete p.r;
  const iv=nextIv(rv,q);
  rv.h=rv.h||[];rv.h.push({d:hoje(),q});rv.n=(rv.n||0)+1;
  if(q==='d')rv.e=Math.max(1.3,(rv.e||2.5)-.2);else if(q==='f')rv.e=Math.min(3.2,(rv.e||2.5)+.15);
  rv.iv=iv;rv.next=add(hoje(),iv);rv.ref=false;
  render();saveTemas();toast(QUAL[q]+': próxima revisão em '+iv+' dias ('+curto(rv.next)+').',()=>restoreSnap(before));
}
function reforcoFeito(id,k){const p=S.prog[id];if(!p||!p.x||!p.x[k])return;const before=snap();p.x[k].f=true;render();saveTemas();toast('Reforço feito.',()=>restoreSnap(before))}
function aposQuestoes(tema,f,c){
  if(!tema||!TOPIC[tema]||f<5||c/f>=.6)return '';
  return anteciparTema(tema);
}
function anteciparTema(tema){
  if(!TOPIC[tema])return '';
  const p=ensureProg(tema),lim=add(hoje(),3);
  if(p.d){const rv=getRv(p);p.rv=rv;delete p.r;if(rv.next>lim){rv.next=lim;rv.ref=true;saveTemas();return ' Revisão do tema antecipada para '+curto(lim)+'.'}return ''}
  if(!p.x.some(x=>!x.f)){p.x.push({due:lim,f:false});saveTemas();return ' Reforço do tema agendado para '+curto(lim)+'.'}
  limpaProg(tema);return '';
}
function adiar(i){
  const h=hoje(),d0=sDate(i);if(d0<h||slotDone(i))return;
  const before=snap();
  const pend=SLOTS.map((s,j)=>j).filter(j=>!slotDone(j)&&sDate(j)>=d0).sort((a,b)=>sDate(a)<sDate(b)?-1:sDate(a)>sDate(b)?1:a-b);
  const list=pend.slice(pend.indexOf(i)),dates=list.map(sDate);
  list.forEach((j,k)=>{S.ag[j]=k<list.length-1?dates[k+1]:nextWorkday(dates[k])});
  render();saveTemas();
  toast('Adiado para '+curto(sDate(i))+'. A teoria agora termina em '+curto(fimTeoria())+'.',()=>restoreSnap(before));
}
// ---- replanejamento ----
function planoNovo(domingos){
  const h=hoje();if(h<S.cfg.inicio)return null;
  const novo={};SLOTS.forEach((s,i)=>{if(slotDone(i)&&isDate(S.ag[i]))novo[i]=S.ag[i]});
  let d=h;const livre=dt=>{const w=dow(dt);return w<5||(domingos&&w===6)};
  SLOTS.forEach((s,i)=>{if(slotDone(i))return;while(!livre(d))d=add(d,1);novo[i]=d;d=add(d,1)});
  return novo;
}
function fimCom(ag){let m=S.cfg.inicio;SLOTS.forEach((s,i)=>{const d=isDate(ag[i])?ag[i]:defDate(i);if(d>m)m=d});return m}

// ================= Registro rápido de questões =================
function tipoPadrao(tid){const p=S.prog[tid];if(p&&p.d)return 'rev';if(!(p&&p.st&&p.st.pre))return 'pre';if(!(p&&p.st&&p.st.pos))return 'pos';return 'livre'}
function aplicaTipo(tid,tipo){if((tipo==='pre'||tipo==='pos')&&TOPIC[tid]){const p=ensureProg(tid);if(!p.st[tipo])return marcaStep(tid,tipo,true)||'step'}return ''}
async function salvarRapido(ctx,tid){
  const b=`qq-${ctx}-${tid}`,fEl=$(b+'-f'),aEl=$(b+'-a'),mEl=$(b+'-m'),tEl=$(b+'-t');if(!fEl)return;
  const f=parseInt(fEl.value,10),c=parseInt(aEl.value,10),tipo=tEl?tEl.value:'livre';
  if(!(f>0)){mEl.textContent='Informe quantas fez.';fEl.focus();return}
  if(!(c>=0)||c>f){mEl.textContent='Acertos entre 0 e '+f+'.';aEl.focus();return}
  const t=TOPIC[tid],before=snap();
  try{
    const id=await addRec('questoes',{data:hoje(),area:t.area,tema:tid,tipo,feitas:f,acertos:c,mot:{},criado:Date.now()});
    const st=aplicaTipo(tid,tipo);
    const extra=(tipo==='pre'?'':aposQuestoes(tid,f,c))+(st==='done'?' Tema concluído.':st?' Etapa “'+TIPO[tipo]+'” marcada.':'');
    if(st)saveTemas();
    qqOpen=null;render();
    toast(TIPO[tipo]+': '+c+'/'+f+' ('+pct(c,f).toFixed(0)+'%).'+extra,async()=>{await delRec('questoes',id);restoreSnap(before)});
  }catch(e){mEl.textContent=errMsg(e)}
}
function quickForm(ctx,tid,meta){
  const b=`qq-${ctx}-${tid}`,tp=tipoPadrao(tid);
  return `<div class="qq">${meta?`<span class="note" style="flex-basis:100%">Meta desta revisão: ${meta} questões</span>`:''}<select class="keep" id="${b}-t" aria-label="Tipo">${Object.keys(TIPO).map(k=>`<option value="${k}" ${k===tp?'selected':''}>${TIPO[k]}</option>`).join('')}</select><input class="keep" id="${b}-f" type="number" min="1" inputmode="numeric" placeholder="Feitas" aria-label="Questões feitas" data-qqenter="${ctx}:${tid}"><input class="keep" id="${b}-a" type="number" min="0" inputmode="numeric" placeholder="Acertos" aria-label="Acertos" data-qqenter="${ctx}:${tid}"><button type="button" class="primary mini" data-qqsave="${ctx}:${tid}">Salvar</button><button type="button" class="ghost mini" data-qq="${ctx}:${tid}">Cancelar</button><button type="button" class="ghost mini" data-qqfull="${tid}">Com motivos dos erros</button><span class="note" id="${b}-m"></span></div>`;
}
const qqKey=(ctx,tid)=>ctx+':'+tid;

// ================= Render: cards e dia =================
const CHECK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function stepChips(tid){
  const p=S.prog[tid],st=p&&p.st||{};let next=STEPS.find(x=>!st[x.k]);
  return `<div class="steps">${STEPS.map(x=>`<button type="button" class="step ${!st[x.k]&&next&&next.k===x.k?'next':''}" aria-pressed="${!!st[x.k]}" data-step="${tid}:${x.k}" title="${st[x.k]?'Feito em '+curto(st[x.k]):'Marcar como feito'}"><i>${CHECK}</i>${x.n}</button>`).join('')}</div>`;
}
function acertoTipo(tid,tipo){let f=0,c=0;S.questoes.forEach(q=>{if(q.tema===tid&&(q.tipo||'livre')===tipo){f+=+q.feitas||0;c+=+q.acertos||0}});return f?{f,c,p:pct(c,f)}:null}
function cardSlot(i,acc,ctx){
  const s=SLOTS[i],t=TOPIC[s.tid],done=slotDone(i),h=hoje(),late=!done&&sDate(i)<h,p=S.prog[s.tid],feito=!!(p&&p.d);
  const meta=[`<span class="note">${NOME[t.area]}</span>`,`<span class="pill">Ciclo ${t.ciclo}</span>`,prioPill(t)];
  const pre=acertoTipo(s.tid,'pre'),pos=acertoTipo(s.tid,'pos');
  if(pre)meta.push(`<span class="pill">pré ${pre.p.toFixed(0)}%</span>`);
  if(pos)meta.push(`<span class="pill ${pos.p<60?'weak':'ok'}">pós ${pos.p.toFixed(0)}%</span>`);
  if(late)meta.push(`<span class="pill late">atrasado · era ${curto(sDate(i))}</span>`);
  if(p&&p.flag)meta.push('<span class="pill x">preciso rever</span>');
  if(S.notas[s.tid]&&(S.notas[s.tid].texto||S.notas[s.tid].link))meta.push('<span class="pill">com nota</span>');
  if(feito)meta.push(`<span class="note">concluída em ${curto(p.d)}</span>`);
  const k=qqKey(ctx,s.tid);
  const acts=[`<button type="button" class="mini" data-qq="${k}" aria-expanded="${qqOpen===k}">+ questões</button>`];
  if(!done&&!late)acts.push(`<button type="button" class="mini" data-adiar="${i}">Adiar</button>`);
  acts.push(`<button type="button" class="mini" data-ficha="${s.tid}">Ficha</button>`);
  acts.push(linkBtn(ctx,s.tid));
  return `<div class="topic a-${t.area} ${feito?'done':''} ${late?'late':''}"><div class="tmain"><button type="button" class="tlink" data-ficha="${s.tid}">${esc(t.nome)}</button><div class="tmeta">${meta.join('')}</div>${feito?'':`<span class="hint">${dayHint(s)}</span>`}${t.bonus.length?`<div class="bonus">Inclui: ${bonusTxt(t)}</div>`:''}${stepChips(s.tid)}<div class="tact">${acts.join('')}</div>${qqOpen===k?quickForm(ctx,s.tid):''}${lkOpen===k?linkForm(ctx,s.tid):''}</div></div>`;
}
// ---- link da aula no drive ----
const linkOk=u=>/^https?:\/\//i.test(u||'');
function linkBtn(ctx,tid){const n=S.notas[tid],k=qqKey(ctx,tid);return n&&linkOk(n.link)?`<a class="mini" href="${esc(n.link)}" target="_blank" rel="noopener">Abrir aula</a><button type="button" class="ghost mini" data-lk="${k}" aria-label="Trocar link da aula">trocar link</button>`:`<button type="button" class="mini" data-lk="${k}">+ link da aula</button>`}
function linkForm(ctx,tid){const b=`lk-${ctx}-${tid}`,n=S.notas[tid]||{};return `<div class="qq"><input class="keep" id="${b}" type="url" placeholder="Cole o link da aula no drive" value="${esc(n.link||'')}" style="width:auto;flex:1;min-width:180px" data-lkenter="${ctx}:${tid}"><button type="button" class="primary mini" data-lksave="${ctx}:${tid}">Salvar</button><button type="button" class="ghost mini" data-lk="${ctx}:${tid}">Cancelar</button><span class="note" id="${b}-m"></span></div>`}
async function salvarLink(ctx,tid){
  const el=$(`lk-${ctx}-${tid}`),m=$(`lk-${ctx}-${tid}-m`);if(!el)return;const v=el.value.trim();
  if(v&&!linkOk(v)){m.textContent='O link precisa começar com https://';return}
  const old=S.notas[tid]?Object.assign({},S.notas[tid]):null;
  try{await putNota(tid,Object.assign({},old||{texto:''},{link:v.slice(0,1000),atualizado:Date.now()}));lkOpen=null;render();toast(v?'Link da aula salvo.':'Link removido.',()=>putNota(tid,old||{texto:'',link:'',atualizado:Date.now()}))}catch(e){m.textContent=errMsg(e)}
}
// ---- revisão dirigida (fases 2 e 3) ----
function simErros(){const m={};S.simulados.forEach(s=>(s.temasErro||[]).forEach(t=>{m[t]=(m[t]||0)+1}));return m}
function ultimoContato(tid){let u=null;const p=S.prog[tid];const up=d=>{if(isDate(d)&&(!u||d>u))u=d};if(p){up(p.d);Object.values(p.st||{}).forEach(up);if(p.rv&&p.rv.h)p.rv.h.forEach(h=>up(h.d))}S.questoes.forEach(q=>{if(q.tema===tid)up(q.data)});return u}
function scoreTema(t,acc,se,ref){
  const p=S.prog[t.id],a=acc[t.id];let s=t.pr;
  if(!(p&&p.d))s+=3;
  if(a&&a.f>=5){const ac=a.c/a.f;if(ac<.6)s+=3;else if(ac<.7)s+=1.5;else if(ac>=.85)s-=1}else s+=1;
  if(p&&p.flag)s+=3;
  s+=Math.min(se[t.id]||0,3);
  const u=ultimoContato(t.id);if(u){const d=diff(ref,u);s+=Math.min(Math.max(d,0)/30,2);if(d>=0&&d<5)s-=4}
  return s;
}
function dirigidos(dt,acc){
  const se=simErros(),wi=semanaIdx(dt),a=ROT[((wi*5+dow(dt))%ROT.length+ROT.length)%ROT.length];
  const rank=TOPICS.map(t=>({t,s:scoreTema(t,acc,se,dt)})).sort((x,y)=>y.s-x.s);
  const r1=rank.find(x=>x.t.area===a),r2=rank.find(x=>x!==r1);
  return [r1,r2].filter(Boolean).map(x=>x.t);
}
function motivoTema(t,acc,se){
  const p=S.prog[t.id],a=acc[t.id],m=[];
  if(!(p&&p.d))m.push('ainda não concluído');
  if(a&&a.f>=5)m.push('acerto '+Math.round(a.c/a.f*100)+'%');else m.push('poucas questões feitas');
  if(p&&p.flag)m.push('marcado “preciso rever”');
  if(se[t.id])m.push('errado em '+se[t.id]+' simulado(s)');
  const u=ultimoContato(t.id);if(u)m.push('último contato '+curto(u));
  return m.join(' · ');
}
function cardDirigido(t,acc,ctx){
  const p=S.prog[t.id],rv=getRv(p),k=qqKey(ctx,t.id),se=simErros();
  const acts=[`<button type="button" class="mini" data-qq="${k}">+ questões</button>`,`<button type="button" class="mini" data-ficha="${t.id}">Ficha</button>`,linkBtn(ctx,t.id)];
  const rate=rv?`<div class="rate">${['d','o','f'].map(q=>`<button type="button" class="${q==='d'?'rd':q==='f'?'rf':''}" data-rate="${t.id}:${q}">${QUAL[q]} · ${nextIv(rv,q)} d</button>`).join('')}</div>`:stepChips(t.id);
  return `<div class="topic a-${t.area}"><div class="tmain"><span class="dirtag">Revisão dirigida</span><button type="button" class="tlink" data-ficha="${t.id}">${esc(t.nome)}</button><div class="tmeta"><span class="note">${NOME[t.area]}</span>${prioPill(t)}</div><span class="note">Por quê: ${esc(motivoTema(t,acc,se))}</span><span class="hint">Resumo + ${rv?metaRev(t,rv.n)+10:20} questões. Depois, diga como foi.</span>${rate}<div class="tact">${acts.join('')}</div>${qqOpen===k?quickForm(ctx,t.id,rv?metaRev(t,rv.n):null):''}${lkOpen===k?linkForm(ctx,t.id):''}</div></div>`;
}
function provaSugerida(banca){const feitas=new Set(S.simulados.filter(x=>x.prova===banca&&x.ano).map(x=>+x.ano));return ANOS.find(a=>!feitas.has(a))||null}
const semanaIdx=dt=>Math.floor(diff(dt,S.cfg.inicio)/7);
function planoDoDia(dt,acc,ctx){
  const f=faseDe(dt),w=dow(dt),wi=semanaIdx(dt),P=provasOrd();
  let h='';
  const prova=P.find(p=>p.data===dt);
  if(prova)h+=`<div class="topic examday"><div class="tmain"><span class="tname">Prova: ${prova.nome}</span><span class="note">Boa prova. Nada de conteúdo novo hoje.</span></div></div>`;
  const ss=slotsEm(dt);
  ss.forEach(i=>h+=cardSlot(i,acc,ctx));
  if(prova||f===0)return h;
  if(f===4)return h+'<div class="plain muted">Provas concluídas.</div>';
  if(w<5&&!ss.length){
    if(f===1)h+='<div class="plain muted">Sem tema novo: reponha atrasos ou faça questões dos temas fracos.</div>';
    else{
      // dia de prova anterior: fase 2 às quartas (banca da 1ª prova); fase 3 às terças e quintas (bancas restantes)
      let banca=null;
      if(f===2&&w===2)banca=P[0]?P[0].nome:'ENARE';
      if(f===3&&(w===1||w===3)){const rest=P.filter(p=>p.data>=dt).map(p=>p.nome);banca=rest.length?rest[w===1?0:rest.length-1]:null}
      if(banca){
        const ano=provaSugerida(banca);
        h+=`<div class="topic"><span class="dot" style="margin-top:6px;background:var(--accent)"></span><div class="tmain"><span class="dirtag">Prova anterior</span><span class="tname">${esc(banca)}${ano?' '+ano:''} na íntegra</span><span class="note">Cronometrada, nas condições da prova. Depois, lance o resultado com os temas que errou e anote os erros importantes no caderno.${banca==='USP-SP'?' A USP-SP usa muitas imagens, especialmente em GO.':''}${banca==='ENARE'?' O ENARE de acesso direto usa a nota do Enamed: priorize provas no formato do Enamed quando houver.':''}</span>${ano?`<div class="tact"><button type="button" class="mini" data-prova="${banca}:${ano}">Lançar resultado</button></div>`:''}</div></div>`;
      }
      if(dt===hoje())dirigidos(dt,acc).forEach(t=>{h+=cardDirigido(t,acc,ctx)});
      else if(dt<hoje())h+='<div class="plain muted">Revisão dirigida</div>';
      else h+=`<div class="plain muted">${banca?'Mais 1 tema':'2 temas'} de revisão dirigida, escolhidos no dia pelo seu desempenho (acerto, “preciso rever”, erros em simulados e tempo sem revisar).</div>`;
    }
  }else if(w===5){
    let txt;
    if(f===1)txt=(wi+1)%4===0?'<b>Simulado</b> no modelo de uma das três provas; lance o resultado na aba Simulados.':'<b>Questões mistas</b>: 60 a 80 questões das 5 áreas.';
    else if(f===2)txt=`<b>Simulado</b> no modelo ${P[0]?P[0].nome:'ENARE'} (100 questões, cronometrado); depois, lance com os temas errados.`;
    else{const rest=P.filter(p=>p.data>=dt);const m=rest.length?rest[wi%rest.length].nome:'SP';txt=`<b>Simulado</b> no modelo ${m} (prova completa, cronometrada); depois, lance com os temas errados.`}
    h+=`<div class="plain">${txt}${f>=2?' <a href="#simulados" class="note">Lançar simulado</a>':''}</div>`;
  }else if(w===6&&!ss.length)h+='<div class="plain muted">Descanso ou reposição.</div>';
  return h;
}

// ================= Render: Hoje =================
function renderHeader(){
  const h=hoje();
  $('countdown').innerHTML=PROVAS.map(p=>{const d=S.cfg.provas[p.k];if(!isDate(d))return'';const n=diff(d,h);return `<div class="cd ${n<0?'done':''}" title="${longo(d)}"><b>${n<0?'feita':n===0?'hoje':n+' d'}</b><span>${p.nome}</span></div>`}).join('');
}
function minutosEm(a,b){let m={t:0,q:0,r:0,tot:0};S.tempo.forEach(r=>{if(isDate(r.data)&&r.data>=a&&r.data<=b&&TCAT[r.cat]){m[r.cat]+=+r.min||0;m.tot+=+r.min||0}});return m}
function renderTempo(){
  const h=hoje(),m=minutosEm(h,h);
  $('tmHoje').textContent=hm(m.tot)+' de 4 h';
  const base=Math.max(META_MIN,m.tot);
  $('tmBar').innerHTML=['t','q','r'].map(k=>m[k]?`<i class="c-${k}" style="width:${m[k]/base*100}%"></i>`:'').join('');
  $('tmLegend').innerHTML=['t','q','r'].map(k=>`<span class="c-${k}"><i class="dot"></i>${TCAT[k]} ${hm(m[k])}</span>`).join('');
  const L=S.tempo.filter(r=>r.data===h).sort((a,b)=>(a.criado||0)-(b.criado||0));
  $('tmList').innerHTML=L.map(r=>`<div class="item c-${esc(r.cat)}"><span class="dot"></span><div class="grow"><span>${esc(TCAT[r.cat]||'')}</span></div><span class="num">${hm(+r.min||0)}</span><button type="button" class="ghost del mini" data-del="tempo:${esc(r.id)}">Apagar</button></div>`).join('');
}
function atividade(){
  const min={},act=new Set();
  S.tempo.forEach(r=>{if(isDate(r.data)){min[r.data]=(min[r.data]||0)+(+r.min||0);act.add(r.data)}});
  ['questoes','simulados','erros'].forEach(c=>S[c].forEach(r=>{if(isDate(r.data))act.add(r.data)}));
  Object.values(S.prog).forEach(p=>{Object.values(p.st||{}).forEach(d=>{if(isDate(d))act.add(d)});if(p.rv&&p.rv.h)p.rv.h.forEach(x=>{if(isDate(x.d))act.add(x.d)})});
  return {min,act};
}
function semStats(ini){
  const fim=add(ini,6),inR=d=>isDate(d)&&d>=ini&&d<=fim;
  let qf=0,qc=0;S.questoes.forEach(q=>{if(inR(q.data)){qf+=+q.feitas||0;qc+=+q.acertos||0}});
  S.simulados.forEach(s=>{if(inR(s.data)){const t=simTot(s);qf+=t.f;qc+=t.c}});
  let tc=0,rv=0;Object.values(S.prog).forEach(p=>{if(inR(p.d))tc++;if(p.rv&&p.rv.h)p.rv.h.forEach(x=>{if(inR(x.d))rv++})});
  return {qf,qc,tc,rv,min:minutosEm(ini,fim).tot};
}
function renderSemana(){
  const h=hoje(),ini=segunda(h),a=semStats(ini),b=semStats(add(ini,-7));
  $('semRange').textContent=curto(ini)+' a '+curto(add(ini,6))+' · comparado à semana anterior';
  const d=(x,y,fmt)=>{const v=x-y;if(!v)return '<span class="d muted">igual</span>';return `<span class="d ${v>0?'up':'down'}">${v>0?'+':'−'}${fmt?fmt(Math.abs(v)):Math.abs(v)}</span>`};
  const pa=pct(a.qc,a.qf),pb=pct(b.qc,b.qf);
  $('semStats').innerHTML=[
    `<div class="stat"><span class="lbl">Questões</span><b>${a.qf}</b>${d(a.qf,b.qf)}</div>`,
    `<div class="stat"><span class="lbl">Acerto</span><b class="${pa==null?'':pctClass(pa)}">${pa==null?'–':pa.toFixed(0)+'%'}</b>${pa!=null&&pb!=null?d(Math.round(pa),Math.round(pb),v=>v+' p.p.'):'<span class="d muted">—</span>'}</div>`,
    `<div class="stat"><span class="lbl">Temas concluídos</span><b>${a.tc}</b>${d(a.tc,b.tc)}</div>`,
    `<div class="stat"><span class="lbl">Revisões feitas</span><b>${a.rv}</b>${d(a.rv,b.rv)}</div>`,
    `<div class="stat"><span class="lbl">Tempo</span><b>${hm(a.min)}</b>${d(a.min,b.min,hm)}</div>`
  ].join('');
  const {min,act}=atividade(),start=add(ini,-17*7);let g='';
  for(let k=0;k<18*7;k++){const dt=add(start,k);if(dt>h){g+='<i class="fut"></i>';continue}
    const m=min[dt]||0;let l=0;if(m>=180)l=4;else if(m>=120)l=3;else if(m>=60)l=2;else if(m>0||act.has(dt))l=1;
    g+=`<i class="${l?'l'+l:''} ${dt===h?'hj':''}" title="${curto(dt)}${m?' · '+hm(m):act.has(dt)?' · com registro':''}"></i>`}
  $('heat').innerHTML=g;
  let st=0,dd=act.has(h)?h:add(h,-1);while(act.has(dd)){st++;dd=add(dd,-1)}
  $('streak').textContent=st?`${st} dia${st>1?'s':''} seguido${st>1?'s':''} com estudo registrado`:'Nenhum dia seguido ainda';
}
function renderHoje(acc){
  const h=hoje(),f=faseDe(h);
  $('hojeTitulo').textContent=DIA[dow(h)]+', '+longo(h);
  $('hojeFase').textContent=FASE_NOME(f)+(f>0&&f<4?' · semana '+(semanaIdx(h)+1)+' de '+totalSemanas():'');
  let al='';
  if(f===0){const n=diff(S.cfg.inicio,h);al+=`<div class="callout info"><span>O cronograma começa em <b>${longo(S.cfg.inicio)}</b>, daqui a ${n} dia${n>1?'s':''}. Até lá, você já pode registrar questões, tempo, simulados e erros.</span><a href="#cronograma">Ver a 1ª semana</a></div>`}
  if(dow(h)===6&&f>0&&f<4)al+=`<div class="callout info"><span><b>Domingo:</b> 10 minutos para revisar a semana que passou e preparar a próxima.</span><button type="button" class="primary" data-act="semana">Planejar a semana</button></div>`;
  const at=atrasados();
  if(at.length)al+=`<div class="callout bad"><span><b>${at.length} ${at.length>1?'dias de tema atrasados':'dia de tema atrasado'}.</b> O mais antigo era para ${curto(sDate(at[0]))}.</span><button type="button" class="primary" data-act="replan">Replanejar</button></div>`;
  $('hojeAlert').innerHTML=al;
  const ats=at.slice(0,2);
  let pl=planoDoDia(h,acc,'h');
  if(ats.length&&f>0)pl+=`<div class="lbl" style="margin-top:6px">Atrasados mais antigos</div>`+ats.map(i=>cardSlot(i,acc,'h')).join('');
  $('hojePlano').innerHTML=pl||'<div class="plain muted">Nada programado para hoje.</div>';
  const revs=revisoesAgendadas().filter(r=>r.ef<=h);
  $('hojeRev').innerHTML=revs.length?revs.slice(0,6).map(r=>itemRev(r,'hr')).join('')+(revs.length>6?`<div class="item"><a href="#revisoes" class="note">Mais ${revs.length-6} na aba Revisões</a></div>`:''):`<div class="empty">${Object.values(S.prog).some(p=>p.d)?'Nenhuma revisão pendente hoje.':'As revisões aparecem aqui quando você concluir os primeiros temas.'}</div>`;
  const pa=acertoPorArea(),ar=AREAS.map(a=>({k:a.k,p:pa[a.k].f>=30?pct(pa[a.k].c,pa[a.k].f):null,f:pa[a.k].f})).filter(x=>x.p!=null).sort((a,b)=>a.p-b.p);
  const fr=Object.entries(acc).filter(([,o])=>o.f>=10).map(([id,o])=>({id,p:pct(o.c,o.f)})).filter(x=>x.p<60).sort((a,b)=>a.p-b.p).slice(0,3);
  let fo='';
  if(ar.length)fo+=`<div class="item a-${ar[0].k}"><span class="dot"></span><div class="grow"><span class="tname">Área mais fraca: ${NOME[ar[0].k]}</span><span class="note">${ar[0].f} questões entre blocos e simulados</span></div><span class="num ${pctClass(ar[0].p)}">${ar[0].p.toFixed(0)}%</span></div>`;
  fr.forEach(x=>{const t=TOPIC[x.id];fo+=`<div class="item a-${t.area}"><span class="dot"></span><div class="grow"><button type="button" class="tlink" data-ficha="${t.id}">${esc(t.nome)}</button><span class="note">Tema com acerto baixo</span></div><span class="num pct-bad">${x.p.toFixed(0)}%</span></div>`});
  TOPICS.filter(t=>S.prog[t.id]&&S.prog[t.id].flag).slice(0,3).forEach(t=>{fo+=`<div class="item a-${t.area}"><span class="dot"></span><div class="grow"><button type="button" class="tlink" data-ficha="${t.id}">${esc(t.nome)}</button><span class="note">Marcada como “preciso rever”</span></div><span class="pill x">rever</span></div>`});
  const mt=motivosTotais();
  if(mt.tot>=10){const top=Object.keys(MOT).sort((a,b)=>mt[b]-mt[a])[0];fo+=`<div class="item"><span class="dot" style="background:var(--warn)"></span><div class="grow"><span class="tname">Erro mais comum: ${MOT[top]}</span><span class="note">${Math.round(mt[top]/mt.tot*100)}% dos erros classificados</span></div></div>`}
  $('hojeFoco').innerHTML=fo||'<div class="empty">Registre questões e simulados para ver aqui sua área e seus temas mais fracos.</div>';
  renderTempo();renderSemana();
}

// ================= Render: Cronograma =================
function renderCronograma(acc){
  const tot=TOPICS.filter(t=>temaFeito(t.id)).length;
  $('totalProg').textContent=tot+' de '+TOPICS.length+' temas · '+Math.round(tot/TOPICS.length*100)+'%';
  $('areaProg').innerHTML=AREAS.map(a=>{const L=TOPICS.filter(t=>t.area===a.k);const f=L.filter(t=>temaFeito(t.id)).length;
    return `<div class="area-stat a-${a.k}"><div class="row"><span class="dot"></span><span class="name">${a.nome}</span><span class="num muted">${f}/${L.length}</span></div><div class="bar"><i style="width:${f/L.length*100}%"></i></div></div>`}).join('');
  const W=totalSemanas(),now=semanaAtual(),emCurso=hoje()>=S.cfg.inicio,P=provasOrd();
  if(semana==null||semana>=W)semana=now;
  const porSem={};SLOTS.forEach((s,i)=>{const w=semanaIdx(sDate(i));const o=porSem[w]||(porSem[w]={n:0,d:0});o.n++;if(slotDone(i))o.d++});
  let h='';
  for(let w=0;w<W;w++){
    const ws=add(S.cfg.inicio,w*7),we=add(ws,6),f=faseDe(ws);
    const ex=P.filter(p=>p.data>=ws&&p.data<=we).map(p=>p.nome);
    const o=porSem[w],fill=o?o.d/o.n:0;
    h+=`<button type="button" data-w="${w}" class="${f===2?'f2':f>=3?'f3':''} ${ex.length?'exam':''} ${emCurso&&w===now?'now':''} ${w===semana?'sel':''}" title="Semana ${w+1} · ${curto(ws)}${ex.length?' · '+ex.join(', '):''}" aria-label="Semana ${w+1}${ex.length?', prova '+ex.join(' e '):''}"><i style="height:${fill*100}%"></i><span>${w+1}</span></button>`;
  }
  $('weekmap').innerHTML=h;
  const at=atrasados(),ft=fimTeoria();
  $('atrasoInfo').innerHTML=(at.length?`<span class="pct-bad">${at.length} atrasado(s)</span> · `:'')+`teoria termina em ${curto(ft)} · <button type="button" class="ghost" data-act="replan" style="padding:0;color:var(--accent)">Replanejar</button>`;
  $('replanBox').hidden=!replanAberto;
  if(replanAberto){
    const novo=planoNovo($('usarDomingo').checked);
    if(!novo){$('replanCmp').innerHTML='<p class="note">O replanejamento fica disponível depois que o cronograma começar.</p>';$('replanAplicar').disabled=true}
    else{const fn=fimCom(novo),pr=P[0];$('replanAplicar').disabled=false;
      $('replanCmp').innerHTML=`<div><span class="lbl">Fim da teoria hoje</span><b>${longo(ft)}</b></div><div><span class="lbl">Com o novo plano</span><b>${longo(fn)}</b></div>`+(pr?`<div><span class="lbl">Semanas de revisão antes do ${pr.nome}</span><b class="${diff(pr.data,fn)<21?'pct-bad':''}">${Math.max(0,Math.floor(diff(pr.data,fn)/7))}</b></div>`:'')}
    $('replanOriginal').disabled=!Object.keys(S.ag).length;
  }
  const ini=add(S.cfg.inicio,semana*7),fim=add(ini,6);
  $('weekTitle').textContent='Semana '+(semana+1)+' de '+W;
  $('weekSub').textContent=curto(ini)+' a '+longo(fim)+' · '+FASE_NOME(faseDe(ini));
  const revs=revisoesAgendadas(),hj=hoje();let d='';
  for(let i=0;i<7;i++){
    const dia=add(ini,i),rv=revs.filter(r=>r.ef===dia),rf=revFeitasEm(dia);
    let body=planoDoDia(dia,acc,'c');
    const parts=rf.map(r=>'✓ '+esc(TOPIC[r.id]?TOPIC[r.id].nome:'')+' ('+QUAL[r.q]+')').concat(rv.map(r=>esc(TOPIC[r.id].nome)+(r.t==='x'?' (reforço)':'')));
    if(parts.length)body+=`<div class="revline">Revisões: ${parts.join(' · ')}</div>`;
    d+=`<div class="day ${dia===hj?'today':''}"><div class="dhead"><div class="dname">${DIA[i]}</div><div class="ddate">${curto(dia)}</div></div><div class="dbody">${body||'<div class="plain muted">—</div>'}</div></div>`;
  }
  $('days').innerHTML=d;
  const set=(id,v)=>{if(document.activeElement!==$(id))$(id).value=v||''};
  set('inicio',S.cfg.inicio);set('revMax',String(S.cfg.revMax||3));PROVAS.forEach(p=>set('d-'+p.k,S.cfg.provas[p.k]));
}

// ================= Render: Revisões =================
const metaRev=(t,n)=>t.pat[Math.min(n||0,t.pat.length-1)];
function itemRev(r,ctx){
  ctx=ctx||'r';
  const t=TOPIC[r.id],h=hoje(),ef=r.ef||r.due,late=r.due<h,due=ef<=h,meta=r.t==='x'?8:metaRev(t,r.n);
  const lbl=r.t==='x'?'<span class="pill x">reforço · acerto baixo</span>':`<span class="note">${(r.n||0)+1}ª revisão · meta ${meta} questões</span>`+(r.ref?'<span class="pill x">antecipada · acerto baixo</span>':'');
  const quando=`<span class="pill ${ef===h?(late?'late':'today'):''}">${ef===h?'hoje':curto(ef)}</span>`+(ef!==r.due?`<span class="note">${late&&ef===h?'prevista para '+curto(r.due):'remarcada de '+curto(r.due)+' pelo limite diário'}</span>`:'');
  const k=qqKey(ctx,r.id);
  let acts='';
  if(due){
    if(r.t==='x')acts=`<div class="rate"><button type="button" data-ref="${r.id}:${r.k}">Feito</button><button type="button" class="mini" data-qq="${k}">+ questões</button></div>`;
    else acts=`<div class="rate">${['d','o','f'].map(q=>`<button type="button" class="${q==='d'?'rd':q==='f'?'rf':''}" data-rate="${r.id}:${q}" aria-label="${QUAL[q]}, próxima em ${nextIv(r.rv,q)} dias">${QUAL[q]} · ${nextIv(r.rv,q)} d</button>`).join('')}<button type="button" class="ghost mini" data-qq="${k}">+ questões</button></div>`;
  }
  return `<div class="item top a-${t.area}"><span class="dot" style="margin-top:7px"></span><div class="grow"><button type="button" class="tlink" data-ficha="${t.id}">${esc(t.nome)}</button><div class="tmeta">${lbl}${quando}</div>${acts}${qqOpen===k?quickForm(ctx,r.id,meta):''}</div></div>`;
}
function renderRevisoes(){
  const hj=hoje(),lim=add(hj,7),revs=revisoesAgendadas();
  const agora=revs.filter(r=>r.ef<=hj),prox=revs.filter(r=>r.ef>hj&&r.ef<=lim);
  $('revCap').textContent=`Limite de ${S.cfg.revMax||3} revisões por dia (segunda a sábado): o que passar disso vai para os próximos dias, as mais antigas primeiro.`;
  $('revNow').innerHTML=agora.length?agora.map(r=>itemRev(r,'r')).join(''):`<div class="empty">${Object.values(S.prog).some(p=>p.d)?'Nenhuma revisão pendente para hoje.':'Conclua as quatro etapas de um tema e as revisões aparecem aqui.'}</div>`;
  $('revNext').innerHTML=prox.length?prox.map(r=>itemRev(r,'r')).join(''):'<div class="empty">Nada agendado para os próximos 7 dias.</div>';
  $('revCountNow').textContent=agora.length?agora.length+' pendente(s)':'';
  $('revCountNext').textContent=prox.length?prox.length+' agendada(s)':'';
  const b=$('revBadge');b.hidden=!agora.length;b.textContent=agora.length;
  const fl=TOPICS.filter(t=>S.prog[t.id]&&S.prog[t.id].flag);
  $('flagPanel').hidden=!fl.length;$('flagCount').textContent=fl.length?fl.length+' tema(s)':'';
  $('flagList').innerHTML=fl.map(t=>`<div class="item a-${t.area}"><span class="dot"></span><div class="grow"><button type="button" class="tlink" data-ficha="${t.id}">${esc(t.nome)}</button><span class="note">${NOME[t.area]}</span></div><button type="button" class="mini" data-flag="${t.id}">Tirar marca</button></div>`).join('');
}

// ================= Render: Questões =================
const motTxt=m=>Object.keys(MOT).filter(k=>m&&+m[k]>0).map(k=>(+m[k])+' '+({ns:'conteúdo',da:'atenção',in:'interpretação'})[k]).join(', ');
function itemQ(q,withDel){
  const p=pct(+q.acertos,+q.feitas),t=TOPIC[q.tema],ms=motTxt(q.mot);
  return `<div class="item a-${esc(q.area)}"><span class="dot"></span><div class="grow"><span class="tname">${t?esc(t.nome):esc(NOME[q.area]||'—')}</span><span class="note">${isDate(q.data)?curto(q.data):''} · ${CURTA[q.area]||''}${q.tipo&&q.tipo!=='livre'&&TIPO[q.tipo]?' · '+TIPO[q.tipo]:''}${ms?' · erros: '+esc(ms):''}</span></div><span class="num">${+q.acertos}/${+q.feitas}</span><span class="num ${p==null?'':pctClass(p)}" style="width:42px;text-align:right">${p==null?'':p.toFixed(0)+'%'}</span>${withDel?`<button type="button" class="ghost mini" data-edit="questoes:${esc(q.id)}">Editar</button><button type="button" class="ghost del mini" data-del="questoes:${esc(q.id)}">Apagar</button>`:''}</div>`;
}
const PESO={cm:.40,cir:.16,ped:.15,go:.16,prev:.13};
function renderMeta(){
  const meta=S.cfg.metaQ||8000,P=provasOrd(),fim=P.length?P[P.length-1].data:add(S.cfg.inicio,330),h=hoje();
  const porArea={};AREAS.forEach(a=>porArea[a.k]=0);let tot=0;
  S.questoes.forEach(q=>{const n=+q.feitas||0;tot+=n;if(porArea[q.area]!=null)porArea[q.area]+=n});
  S.simulados.forEach(x=>AREAS.forEach(a=>{const z=x.areas&&x.areas[a.k];if(z){tot+=+z.q||0;porArea[a.k]+=+z.q||0}}));
  const durac=Math.max(1,diff(fim,S.cfg.inicio)),dec=Math.min(1,Math.max(0,diff(h,S.cfg.inicio)/durac)),esper=Math.round(meta*dec);
  $('metaTxt').innerHTML=`<b class="num">${tot.toLocaleString('pt-BR')}</b> de ${meta.toLocaleString('pt-BR')} questões · ${Math.round(tot/meta*100)}%`;
  const falta=Math.max(0,meta-tot),diasRest=Math.max(1,diff(fim,h>S.cfg.inicio?h:S.cfg.inicio));
  $('metaRitmo').textContent=h<S.cfg.inicio?`Ritmo necessário: ~${Math.ceil(meta/(durac/7))} por semana a partir de ${curto(S.cfg.inicio)}`:(tot>=esper?`No ritmo (esperado hoje: ${esper.toLocaleString('pt-BR')})`:`${(esper-tot).toLocaleString('pt-BR')} abaixo do esperado hoje · faltam ~${Math.ceil(falta/(diasRest/7))} por semana`);
  $('metaBar').innerHTML=`<i style="width:${Math.min(100,tot/meta*100)}%"></i><b style="left:${dec*100}%" title="Esperado hoje"></b>`;
  $('metaArea').innerHTML=`<thead><tr><th>Área</th><th class="n">Feitas</th><th class="n">Meta</th><th class="n">%</th></tr></thead><tbody>`+AREAS.map(a=>{const m=Math.round(meta*PESO[a.k]),p=Math.round(porArea[a.k]/m*100);return `<tr class="a-${a.k}"><td><span class="row" style="gap:8px;flex-wrap:nowrap"><span class="dot"></span>${CURTA[a.k]}</span></td><td class="n">${porArea[a.k].toLocaleString('pt-BR')}</td><td class="n">${m.toLocaleString('pt-BR')}</td><td class="n">${p}%</td></tr>`}).join('')+'</tbody>';
  if(document.activeElement!==$('metaQ'))$('metaQ').value=meta;
}
function renderQuestoes(acc){
  renderMeta();
  const Q=S.questoes;let tf=0,ta=0;
  const rows=AREAS.map(a=>{const qs=Q.filter(q=>q.area===a.k);const f=qs.reduce((s,q)=>s+(+q.feitas||0),0),c=qs.reduce((s,q)=>s+(+q.acertos||0),0);tf+=f;ta+=c;const p=pct(c,f);
    return `<tr class="a-${a.k}"><td><span class="row" style="gap:8px;flex-wrap:nowrap"><span class="dot"></span>${CURTA[a.k]}</span></td><td class="n">${f}</td><td class="n">${c}</td><td class="n ${p==null?'':pctClass(p)}">${p==null?'–':p.toFixed(1)+'%'}</td></tr>`}).join('');
  const pt=pct(ta,tf);
  $('qTable').innerHTML=`<thead><tr><th>Área</th><th class="n">Feitas</th><th class="n">Acertos</th><th class="n">%</th></tr></thead><tbody>${rows}<tr class="avg"><td>Total</td><td class="n">${tf}</td><td class="n">${ta}</td><td class="n ${pt==null?'':pctClass(pt)}">${pt==null?'–':pt.toFixed(1)+'%'}</td></tr></tbody>`;
  $('qTotal').textContent=tf?tf+' questões':'';
  const fr=Object.entries(acc).filter(([,o])=>o.f>=10).map(([id,o])=>({id,p:pct(o.c,o.f),f:o.f})).sort((a,b)=>a.p-b.p).slice(0,6);
  $('qWeak').innerHTML=fr.length?fr.map(x=>{const t=TOPIC[x.id];return `<div class="item a-${t.area}"><span class="dot"></span><div class="grow"><button type="button" class="tlink" data-ficha="${t.id}">${esc(t.nome)}</button><span class="note">${x.f} questões</span></div><span class="num ${pctClass(x.p)}">${x.p.toFixed(0)}%</span></div>`}).join(''):'<div class="empty">Registre blocos com o tema escolhido para ver onde você erra mais.</div>';
  const rec=[...Q].sort((a,b)=>(b.data||'').localeCompare(a.data||'')||(b.criado||0)-(a.criado||0)).slice(0,30);
  $('qList').innerHTML=rec.length?rec.map(q=>itemQ(q,true)).join(''):'<div class="empty">Nenhum bloco registrado ainda. O jeito mais rápido é o botão “+ questões” no card do tema.</div>';
}

// ================= Render: Erros =================
function motivosTotais(){const t={ns:0,da:0,in:0,tot:0};S.questoes.forEach(q=>{const m=q.mot||{};Object.keys(MOT).forEach(k=>{t[k]+=+m[k]||0})});S.erros.forEach(e=>{if(MOT[e.mot])t[e.mot]++});t.tot=t.ns+t.da+t.in;return t}
function errosFiltrados(){
  const fa=$('eFiltro').value,bq=$('eBusca').value.trim().toLowerCase(),dom=$('eDom').checked;
  let L=[...S.erros].sort((a,b)=>(b.data||'').localeCompare(a.data||'')||(b.criado||0)-(a.criado||0));
  if(fa)L=L.filter(e=>e.area===fa);
  if(!dom)L=L.filter(e=>!e.dom);
  if(bq)L=L.filter(e=>((e.texto||'')+' '+(e.quest||'')+' '+(TOPIC[e.tema]?TOPIC[e.tema].nome:'')).toLowerCase().includes(bq));
  return L;
}
function renderErros(){
  const t=motivosTotais();
  $('motTotal').textContent=t.tot?t.tot+' erros classificados':'';
  $('motBars').innerHTML=t.tot?Object.keys(MOT).map(k=>{const p=t[k]/t.tot*100;return `<div class="motbar"><span>${MOT[k]}</span><div class="bar"><i style="width:${p}%;background:${k==='ns'?'var(--accent)':k==='da'?'var(--warn)':'var(--go)'}"></i></div><span class="num" style="text-align:right">${Math.round(p)}%</span></div>`}).join(''):'<div class="empty">Ao registrar questões, preencha “Por que errou”, ou anote erros no caderno abaixo. O resumo aparece aqui.</div>';
  $('motDica').innerHTML=t.tot>=10?`<div class="callout info"><span>${MOT_DICA[Object.keys(MOT).sort((a,b)=>t[b]-t[a])[0]]}</span></div>`:'';
  const L=errosFiltrados(),nd=S.erros.filter(e=>e.dom).length;
  $('fcAbrir').disabled=!L.length;
  $('eList').innerHTML=L.length?L.slice(0,100).map(e=>{const tp=TOPIC[e.tema];return `<div class="item top a-${esc(e.area)}"><span class="dot" style="margin-top:7px"></span><div class="grow">${tp?`<button type="button" class="tlink" data-ficha="${tp.id}">${esc(tp.nome)}</button>`:`<span class="tname">${esc(NOME[e.area]||'')}</span>`}<div class="tmeta"><span class="note">${isDate(e.data)?curto(e.data):''} · ${esc(e.banca||'')}</span><span class="pill">${esc(MOT[e.mot]||'')}</span>${e.dom?'<span class="pill ok">já sei</span>':''}</div>${e.quest?`<div class="erro-q">${esc(e.quest)}</div>`:''}<div class="erro-txt">${esc(e.texto)}</div></div><div style="display:flex;flex-direction:column;gap:2px"><button type="button" class="ghost mini" data-edit="erros:${esc(e.id)}">Editar</button><button type="button" class="ghost del mini" data-del="erros:${esc(e.id)}">Apagar</button></div></div>`}).join(''):`<div class="empty">${S.erros.length?(nd&&!$('eDom').checked?'Nenhuma anotação pendente com esse filtro. Marque “Incluir os que já sei” para ver todas.':'Nenhuma anotação com esse filtro.'):'Seu caderno está vazio. A cada questão errada importante, anote em uma ou duas frases o que ela cobrava.'}</div>`;
}

// ================= Render: Simulados =================
function simTot(s){let f=0,c=0;AREAS.forEach(a=>{const x=s.areas&&s.areas[a.k];if(x){f+=+x.q||0;c+=+x.a||0}});return {f,c,p:pct(c,f)}}
const ANOS=[2026,2025,2024,2023,2022,2021,2020,2019],BANCAS=['SUS-SP','USP-SP','ENARE'];
function renderProvas(){
  let n=0,h='<span></span>'+ANOS.map(a=>`<span class="h">${a}</span>`).join('');
  BANCAS.forEach(b=>{h+=`<span class="b">${b}</span>`;ANOS.forEach(a=>{
    const L=S.simulados.filter(x=>x.prova===b&&+x.ano===a);
    if(L.length){n++;const t=simTot(L[L.length-1]);h+=`<button type="button" data-edit="simulados:${esc(L[L.length-1].id)}" title="${esc(L[L.length-1].nome)} · ${t.c}/${t.f}" class="${pctClass(t.p)}">${t.p.toFixed(0)}%</button>`}
    else h+=`<button type="button" class="vazio" data-prova="${b}:${a}" aria-label="Lançar ${b} ${a}">—</button>`})});
  $('pGrid').innerHTML=h;$('pCount').textContent=n+' de '+(BANCAS.length*ANOS.length)+' feitas';
}
function renderSimulados(){
  renderProvas();
  const fm=$('sFiltro').value;
  const L=[...S.simulados].filter(s=>!fm||s.prova===fm).sort((a,b)=>(a.data||'').localeCompare(b.data||''));
  if(!L.length){$('sTable').innerHTML='';$('sChart').innerHTML=`<div class="empty">${S.simulados.length?'Nenhum simulado neste modelo ainda.':'Lance o primeiro simulado acima. A tabela mostra o % de acerto em cada grande área e a evolução aparece a partir do segundo.'}</div>`;$('sLegend').innerHTML='';$('sCallout').innerHTML='';return}
  const head=`<thead><tr><th>Data</th><th>Simulado</th>${AREAS.map(a=>`<th class="n">${CURTA[a.k]}</th>`).join('')}<th class="n">Total</th><th></th></tr></thead>`;
  const cell=x=>{const p=x?pct(+x.a,+x.q):null;return `<td class="n ${p==null?'':pctClass(p)}" title="${x?(+x.a)+'/'+(+x.q):''}">${p==null?'–':p.toFixed(0)+'%'}</td>`};
  const body=[...L].reverse().map(s=>{const t=simTot(s);return `<tr><td class="num">${isDate(s.data)?curto(s.data)+' '+String(pd(s.data).getUTCFullYear()).slice(2):''}</td><td><div style="font-weight:600">${esc(s.nome||'Simulado')}</div><div class="note">${esc(s.prova||'')}${s.ano?' · prova '+s.ano+' na íntegra':''}</div></td>${AREAS.map(a=>cell(s.areas&&s.areas[a.k])).join('')}<td class="n ${t.p==null?'':pctClass(t.p)}" style="font-weight:600">${t.p==null?'–':t.p.toFixed(1)+'%'}</td><td><button type="button" class="ghost mini" data-edit="simulados:${esc(s.id)}">Editar</button><button type="button" class="ghost del mini" data-del="simulados:${esc(s.id)}">Apagar</button></td></tr>`}).join('');
  const med=AREAS.map(a=>{let f=0,c=0;L.forEach(s=>{const x=s.areas&&s.areas[a.k];if(x){f+=+x.q||0;c+=+x.a||0}});return {k:a.k,p:pct(c,f)}});
  let F=0,C=0;L.forEach(s=>{const t=simTot(s);F+=t.f;C+=t.c});const PM=pct(C,F);
  $('sTable').innerHTML=head+'<tbody>'+body+`<tr class="avg"><td></td><td>Média acumulada</td>${med.map(m=>`<td class="n ${m.p==null?'':pctClass(m.p)}">${m.p==null?'–':m.p.toFixed(0)+'%'}</td>`).join('')}<td class="n ${PM==null?'':pctClass(PM)}">${PM==null?'–':PM.toFixed(1)+'%'}</td><td></td></tr></tbody>`;
  const val=med.filter(m=>m.p!=null).sort((a,b)=>a.p-b.p);
  $('sCallout').innerHTML=val.length>1?`<div class="callout"><span>Área mais fraca${fm?' no modelo '+esc(fm):''}: <b>${NOME[val[0].k]}</b> (${val[0].p.toFixed(0)}%). Mais forte: <b>${NOME[val[val.length-1].k]}</b> (${val[val.length-1].p.toFixed(0)}%).</span></div>`:'';
  if(L.length<2){$('sChart').innerHTML='<p class="note">O gráfico de evolução aparece a partir do segundo simulado.</p>';$('sLegend').innerHTML='';return}
  const W=680,H=240,ml=40,mr=14,mt=12,mb=30,iw=W-ml-mr,ih=H-mt-mb;
  const x=i=>ml+i*iw/(L.length-1),y=p=>mt+ih-(p/100)*ih;
  let g='';
  [0,25,50,75,100].forEach(v=>{g+=`<line x1="${ml}" x2="${W-mr}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--line)" stroke-width="1"/><text x="${ml-8}" y="${y(v)+4}" text-anchor="end">${v}%</text>`});
  const step=Math.ceil(L.length/8);
  L.forEach((s,i)=>{if(i%step===0||i===L.length-1)g+=`<text x="${x(i)}" y="${H-8}" text-anchor="middle">${isDate(s.data)?curto(s.data):i+1}</text>`});
  AREAS.forEach(a=>{const pts=L.map((s,i)=>{const z=s.areas&&s.areas[a.k];const p=z?pct(+z.a,+z.q):null;return p==null?null:[x(i),y(p)]}).filter(Boolean);if(!pts.length)return;
    g+=`<polyline fill="none" style="stroke:var(--${a.k})" stroke-width="2" stroke-linejoin="round" points="${pts.map(p=>p.join(',')).join(' ')}"/>`;const e=pts[pts.length-1];g+=`<circle cx="${e[0]}" cy="${e[1]}" r="3.5" style="fill:var(--${a.k})"/>`});
  $('sChart').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Evolução do % de acerto por área nos simulados">${g}</svg>`;
  $('sLegend').innerHTML=AREAS.map(a=>`<span class="a-${a.k}"><i class="dot"></i>${CURTA[a.k]}</span>`).join('');
}

// ================= Modal: ficha do tema e cartões =================
function abrirModal(m){MODAL=m;$('modal').hidden=false;document.body.classList.add('locked');renderModal(true);setTimeout(()=>{const c=$('mClose');if(c)c.focus()},30)}
function fecharModal(){MODAL=null;FC=null;$('modal').hidden=true;document.body.classList.remove('locked');$('mbox').innerHTML=''}
function renderModal(full){
  if(!MODAL)return;
  if(MODAL.t==='ficha'){
    const t=TOPIC[MODAL.id];if(!t){fecharModal();return}
    if(full||!$('fInfo')){
      const n=S.notas[t.id]||{};
      $('mbox').innerHTML=`<div class="mhead"><div style="display:flex;flex-direction:column;gap:6px;min-width:0"><span class="lbl a-${t.area}" style="display:flex;gap:6px;align-items:center"><i class="dot"></i>${NOME[t.area]}</span><h2 id="mTitle">${esc(t.nome)}</h2><div class="tmeta"><span class="pill">Ciclo ${t.ciclo}</span>${prioPill(t)}<span class="pill">${t.dias} dia${t.dias>1?'s':''} no cronograma</span><span class="pill">questões por revisão: ${t.patTxt}</span></div></div><button type="button" class="ghost" id="mClose" data-close="1">Fechar</button></div>
      <div id="fInfo" style="display:flex;flex-direction:column;gap:16px"></div>
      <div class="msec"><h3>Anotações do tema</h3><textarea id="fNota" placeholder="Resumo, mnemônicos, onde está no seu material…" style="min-height:120px">${esc(n.texto||'')}</textarea><input id="fLink" placeholder="Link da aula ou do material (opcional)" value="${esc(n.link||'')}"><div class="row between"><span class="note" id="fNotaMsg">${n.atualizado?'Salvo em '+longo(new Date(n.atualizado).toISOString().slice(0,10)):''}</span><button type="button" class="primary" id="fSalvar">Salvar anotações</button></div><div id="fLinkOut"></div></div>`;
    }
    const acc=acertoPorTema()[t.id],p=S.prog[t.id],rv=getRv(p);
    const datas=SLOTS.map((s,i)=>({s,i})).filter(o=>o.s.tid===t.id);
    const st=p&&p.d?`Concluído em ${longo(p.d)}`:'Prevista para '+datas.map(o=>curto(sDate(o.i))).join(' e ')+(nSteps(p)?` · ${nSteps(p)} de 4 etapas feitas`:'');
    const pre=acertoTipo(t.id,'pre'),pos=acertoTipo(t.id,'pos'),rvq=acertoTipo(t.id,'rev');
    const hist=rv&&rv.h&&rv.h.length?rv.h.slice().reverse().map(h=>`${curto(h.d)} · ${QUAL[h.q]}`).join(', '):'nenhuma ainda';
    const qs=S.questoes.filter(q=>q.tema===t.id).sort((a,b)=>(b.data||'').localeCompare(a.data||'')).slice(0,5);
    const er=S.erros.filter(e=>e.tema===t.id);
    const ap=acc?pct(acc.c,acc.f):null;
    const n=S.notas[t.id]||{};
    $('fInfo').innerHTML=`<dl class="kv"><dt>Situação</dt><dd>${st}</dd><dt>Próxima revisão</dt><dd>${rv?longo(rv.next)+(rv.ref?' (antecipada por acerto baixo)':''):'depois de concluir o tema'}</dd><dt>Revisões feitas</dt><dd>${hist}</dd>${simErros()[t.id]?`<dt>Simulados</dt><dd>errado em ${simErros()[t.id]} simulado(s)</dd>`:''}<dt>Questões</dt><dd>${acc&&acc.f?`${acc.c}/${acc.f} · <span class="${pctClass(ap)}">${ap.toFixed(0)}%</span> no total`:'nenhuma registrada'}${pre||pos||rvq?'<br>'+[pre?`pré ${pre.c}/${pre.f} (${pre.p.toFixed(0)}%)`:'',pos?`pós ${pos.c}/${pos.f} (${pos.p.toFixed(0)}%)`:'',rvq?`revisões ${rvq.c}/${rvq.f} (${rvq.p.toFixed(0)}%)`:''].filter(Boolean).join(' · '):''}</dd></dl>
      ${t.bonus.length?`<div class="msec"><h3>Subtemas (palavras-chave para o drive)</h3><div class="bonus" style="font-size:14px">${bonusTxt(t)}</div></div>`:''}
      <div class="msec"><div class="row between"><h3>Etapas</h3><button type="button" class="mini" data-flag="${t.id}">${p&&p.flag?'Tirar “preciso rever”':'Marcar “preciso rever”'}</button></div>${stepChips(t.id)}</div>
      <div class="msec"><div class="row between"><h3>Questões do tema</h3><button type="button" class="mini" data-qq="f:${t.id}">+ questões</button></div>${qqOpen==='f:'+t.id?quickForm('f',t.id,rv?metaRev(t,rv.n):null):''}<div class="list">${qs.length?qs.map(q=>itemQ(q,false)).join(''):'<div class="note">Nenhum bloco ainda.</div>'}</div></div>
      ${er.length?`<div class="msec"><h3>No caderno de erros (${er.length})</h3><div class="list">${er.slice(0,5).map(e=>`<div class="item top"><div class="grow">${e.quest?`<div class="erro-q">${esc(e.quest)}</div>`:''}<div class="erro-txt">${esc(e.texto)}</div></div></div>`).join('')}</div></div>`:''}`;
    $('fLinkOut').innerHTML=/^https?:\/\//i.test(n.link||'')?`<a href="${esc(n.link)}" target="_blank" rel="noopener">Abrir link do material</a>`:'';
  }else if(MODAL.t==='semana'){
    const h=hoje(),ini=dow(h)===6?add(h,1):segunda(h),antes=add(ini,-7),a=semStats(antes),acc=acertoPorTema();
    const at=atrasados(),revs=revisoesAgendadas(),venc=revisoes().filter(r=>r.due<h).length;
    const fr=Object.entries(acc).filter(([,o])=>o.f>=10).map(([id,o])=>({t:TOPIC[id],p:pct(o.c,o.f)})).filter(x=>x.t&&x.p<60).sort((x,y)=>x.p-y.p).slice(0,3);
    const pa=pct(a.qc,a.qf);
    let dias='';
    for(let i=0;i<6;i++){const d=add(ini,i),ss=slotsEm(d).map(j=>TOPIC[SLOTS[j].tid]),nr=revs.filter(r=>r.ef===d).length,f=faseDe(d),P=provasOrd(),pv=P.find(p=>p.data===d);
      const itens=[];if(pv)itens.push('<b>Prova: '+pv.nome+'</b>');ss.forEach(t=>itens.push(esc(t.nome)));
      if(!ss.length&&!pv){if(i===5)itens.push(f===1?((semanaIdx(d)+1)%4===0?'Simulado':'Questões mistas'):'Simulado');else if(f>=2)itens.push('Revisão dirigida');}
      if(nr)itens.push(nr+' revisão(ões)');
      dias+=`<div class="wkday"><span class="lbl">${DIA[i].slice(0,3)} ${curto(d)}</span><span>${itens.join(' · ')||'—'}</span></div>`}
    $('mbox').innerHTML=`<div class="mhead"><h2 id="mTitle">Planejar a semana</h2><button type="button" class="ghost" id="mClose" data-close="1">Fechar</button></div>
    <div class="msec" style="border-top:0;padding-top:0"><h3>Semana passada (${curto(antes)} a ${curto(add(antes,6))})</h3>
      <div class="stats"><div class="stat"><span class="lbl">Questões</span><b>${a.qf}</b><span class="d muted">${pa==null?'—':pa.toFixed(0)+'% de acerto'}</span></div><div class="stat"><span class="lbl">Temas concluídos</span><b>${a.tc}</b></div><div class="stat"><span class="lbl">Revisões</span><b>${a.rv}</b></div><div class="stat"><span class="lbl">Tempo</span><b>${hm(a.min)}</b></div></div></div>
    <div class="msec"><h3>Pontos de atenção</h3><div class="list">
      ${at.length?`<div class="item"><span class="pill late">${at.length} dia(s) de tema atrasados</span><div class="grow"></div><button type="button" class="mini primary" data-act="replan">Replanejar</button></div>`:'<div class="item"><span class="pill ok">sem temas atrasados</span></div>'}
      ${venc?`<div class="item"><span class="pill x">${venc} revisão(ões) vencida(s)</span><div class="grow note">Vão sendo distribuídas pelo limite diário. Se a fila crescer, aumente o limite em Cronograma > Datas.</div></div>`:''}
      ${fr.map(x=>`<div class="item a-${x.t.area}"><span class="dot"></span><div class="grow"><button type="button" class="tlink" data-ficha="${x.t.id}">${esc(x.t.nome)}</button><span class="note">acerto ${x.p.toFixed(0)}%: encaixe uma revisão extra</span></div></div>`).join('')}
    </div></div>
    <div class="msec"><h3>${dow(h)===6?'Próxima semana':'Esta semana'} (${curto(ini)} a ${curto(add(ini,5))})</h3><div>${dias}</div></div>
    <div class="msec"><div class="row"><button type="button" class="primary" data-act="cal4">Exportar 4 semanas para o calendário</button><button type="button" data-act="backup">Baixar backup</button></div><span class="note" id="calMsg2"></span></div>`;
  }else if(MODAL.t==='fc'){
    const F=FC;if(!F){fecharModal();return}
    const total=F.deck.length;
    if(F.i>=total){
      $('mbox').innerHTML=`<div class="mhead"><h2 id="mTitle">Revisão concluída</h2><button type="button" class="ghost" id="mClose" data-close="1">Fechar</button></div><p>${F.ok} marcado${F.ok===1?'':'s'} como “já sei” e ${F.again} para rever de novo.</p><div class="row"><button type="button" class="primary" data-close="1">Fechar</button></div>`;return;
    }
    const e=S.erros.find(x=>x.id===F.deck[F.i]);
    if(!e){F.i++;renderModal(true);return}
    const tp=TOPIC[e.tema];
    $('mbox').innerHTML=`<div class="mhead"><span class="lbl">Cartão ${Math.min(F.i+1,total)} de ${total}</span><button type="button" class="ghost" id="mClose" data-close="1">Fechar</button></div>
    <div class="fc"><div class="tmeta a-${esc(e.area)}"><i class="dot"></i><span class="note">${tp?esc(tp.nome):esc(NOME[e.area]||'')} · ${esc(e.banca||'')}</span><span class="pill">${esc(MOT[e.mot]||'')}</span></div>
    <div class="front" id="mTitle">${e.quest?esc(e.quest):'O que este erro te ensinou'+(tp?' sobre '+esc(tp.nome):'')+'?'}</div>
    ${F.show?`<div class="back">${esc(e.texto)}</div><div class="row"><button type="button" data-fc="again">Rever de novo</button><button type="button" class="primary" data-fc="ok">Já sei</button></div>`:`<div class="row"><button type="button" class="primary" data-fc="show" id="fcShow">Mostrar resposta</button></div>`}</div>`;
    if(!F.show)setTimeout(()=>{const b=$('fcShow');if(b)b.focus()},10);
  }
}
async function fcResp(kind){
  const F=FC;if(!F)return;const id=F.deck[F.i];const e=S.erros.find(x=>x.id===id);
  if(kind==='show'){F.show=true;renderModal(true);return}
  if(e){
    if(kind==='ok'){F.ok++;if(!e.dom)putRec('erros',id,Object.assign({},e,{dom:true,visto:hoje()})).catch(()=>toast('Não foi possível salvar.'))}
    else{F.again++;F.deck.push(id);if(e.dom)putRec('erros',id,Object.assign({},e,{dom:false,visto:hoje()})).catch(()=>{})}
  }
  F.i++;F.show=false;renderModal(true);
}

// ================= Render geral =================
function render(){
  const keep={};document.querySelectorAll('.keep').forEach(el=>{if(el.value)keep[el.id]=el.value});
  const act=document.activeElement&&document.activeElement.classList&&document.activeElement.classList.contains('keep')?document.activeElement.id:null;
  const acc=acertoPorTema();
  renderHeader();renderCronograma(acc);renderHoje(acc);renderRevisoes();renderQuestoes(acc);renderErros();renderSimulados();
  if(MODAL&&MODAL.t==='ficha')renderModal(false);
  Object.entries(keep).forEach(([id,v])=>{const el=$(id);if(el)el.value=v});
  if(act&&$(act))$(act).focus();
}

// ================= Navegação =================
const VIEWS=['hoje','cronograma','revisoes','questoes','erros','simulados'];
function route(){
  const h=(location.hash||'').slice(1),v=VIEWS.includes(h)?h:'hoje';
  VIEWS.forEach(x=>{$('v-'+x).hidden=x!==v});
  document.querySelectorAll('nav.tabs a').forEach(a=>{if(a.dataset.v===v)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
}
window.addEventListener('hashchange',()=>{route();window.scrollTo(0,0)});
function irPara(v,el){if(location.hash!=='#'+v)location.hash=v;setTimeout(()=>{if(el&&el.scrollIntoView)el.scrollIntoView({block:'start'})},40)}
function abrirReplan(){replanAberto=true;irPara('cronograma');render();setTimeout(()=>{const b=$('replanBox');if(b.scrollIntoView)b.scrollIntoView({block:'center'})},80)}

// ================= Edição de registros =================
function setEdit(col,id){
  EDIT[col]=id;
  const bar={questoes:'qEditBar',simulados:'sEditBar',erros:'eEditBar'}[col],btn={questoes:'qSubmit',simulados:'sSubmit',erros:'eSubmit'}[col];
  $(bar).hidden=!id;$(btn).textContent=id?'Salvar alterações':({questoes:'Salvar',simulados:'Salvar simulado',erros:'Salvar no caderno'}[col]);
}
function limparForm(col){
  if(col==='questoes'){['qFeitas','qAcertos','mNs','mDa','mIn','qTema'].forEach(id=>$(id).value='');$('qData').value=hoje();$('qTipo').value='livre'}
  if(col==='simulados'){$('sNome').value='';$('sAno').value='';sErr=[];renderChips();AREAS.forEach(a=>{$('sq-'+a.k).value='';$('sa-'+a.k).value=''});$('sData').value=hoje();simLive()}
  if(col==='erros'){$('eTexto').value='';$('eQuest').value='';$('eData').value=hoje()}
}
function editar(col,id){
  const r=S[col].find(x=>x.id===id);if(!r)return;
  if(col==='questoes'){
    $('qData').value=r.data||hoje();$('qArea').value=r.area;$('qTema').value=TOPIC[r.tema]?LABEL[r.tema]:'';
    $('qFeitas').value=r.feitas;$('qAcertos').value=r.acertos;$('qTipo').value=TIPO[r.tipo]?r.tipo:'livre';const m=r.mot||{};$('mNs').value=m.ns||'';$('mDa').value=m.da||'';$('mIn').value=m.in||'';
    setEdit(col,id);$('qMsg').textContent='';irPara('questoes',$('qPanel'));setTimeout(()=>$('qFeitas').focus(),60);
  }else if(col==='simulados'){
    $('sNome').value=r.nome||'';$('sData').value=r.data||hoje();$('sProva').value=r.prova||'SUS-SP';$('sAno').value=r.ano?String(r.ano):'';
    AREAS.forEach(a=>{const x=r.areas&&r.areas[a.k];$('sq-'+a.k).value=x?x.q:'';$('sa-'+a.k).value=x?x.a:''});simLive();sErr=(r.temasErro||[]).filter(t=>TOPIC[t]);renderChips();
    setEdit(col,id);$('sMsg').textContent='';irPara('simulados',$('sPanel'));
  }else if(col==='erros'){
    $('eData').value=r.data||hoje();$('eArea').value=r.area;$('eTema').value=TOPIC[r.tema]?LABEL[r.tema]:'';$('eMot').value=r.mot||'ns';$('eBanca').value=r.banca||'SUS-SP';$('eQuest').value=r.quest||'';$('eTexto').value=r.texto||'';
    setEdit(col,id);$('eMsg').textContent='';irPara('erros',$('ePanel'));setTimeout(()=>$('eTexto').focus(),60);
  }
}
async function salvarRec(col,rec,msgEl,okMsg){
  const id=EDIT[col];
  if(id){
    const old=S[col].find(x=>x.id===id);rec.criado=old&&old.criado||rec.criado;
    await putRec(col,id,rec);setEdit(col,null);limparForm(col);msgEl.textContent='';
    toast('Alterações salvas.',old?()=>putRec(col,id,old):null);return null;
  }
  const nid=await addRec(col,rec);limparForm(col);msgEl.textContent=okMsg;
  return nid;
}

// ================= Eventos =================
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-lk],[data-lksave],[data-anotar],[data-chiprm],[data-prova],[data-step],[data-flag],[data-rate],[data-ref],[data-w],[data-del],[data-act],[data-qq],[data-qqsave],[data-qqfull],[data-adiar],[data-ficha],[data-close],[data-fc],[data-edit],[data-cancel]');
  if(!t){if(e.target===$('modal'))fecharModal();return}
  const d=t.dataset;
  if(d.lk){lkOpen=lkOpen===d.lk?null:d.lk;qqOpen=null;render();if(lkOpen){const [cx,tid]=lkOpen.split(':');setTimeout(()=>{const el=$(`lk-${cx}-${tid}`);if(el)el.focus()},20)}}
  else if(d.lksave){const [cx,tid]=d.lksave.split(':');salvarLink(cx,tid)}
  else if(d.chiprm){sErr=sErr.filter(x=>x!==d.chiprm);renderChips()}
  else if(d.anotar){const [tid,b]=d.anotar.split(':');setEdit('erros',null);limparForm('erros');$('eArea').value=TOPIC[tid].area;$('eTema').value=LABEL[tid];if([...$('eBanca').options].some(o=>o.value===b))$('eBanca').value=b;irPara('erros',$('ePanel'));setTimeout(()=>$('eQuest').focus(),60)}
  else if(d.prova){const [b,a]=d.prova.split(':');setEdit('simulados',null);limparForm('simulados');$('sProva').value=b;$('sAno').value=a;$('sNome').value=b+' '+a+' na íntegra';irPara('simulados',$('sPanel'));setTimeout(()=>$('sq-cm').focus(),60)}
  else if(d.step){const [id,k]=d.step.split(':');toggleStep(id,k)}
  else if(d.flag)toggleFlag(d.flag);
  else if(d.rate){const [id,q]=d.rate.split(':');rate(id,q)}
  else if(d.ref){const [id,k]=d.ref.split(':');reforcoFeito(id,+k)}
  else if(d.w!=null){semana=+d.w;render()}
  else if(d.act==='replan'){if(MODAL)fecharModal();abrirReplan()}
  else if(d.act==='semana')abrirModal({t:'semana'});
  else if(d.act==='cal4'){exportarCal(ICS_OK?'ics':'csv',28,true)}
  else if(d.act==='backup'){$('bkBaixar').click()}
  else if(d.qq){qqOpen=qqOpen===d.qq?null:d.qq;lkOpen=null;render();if(qqOpen){const [cx,tid]=qqOpen.split(':');setTimeout(()=>{const el=$(`qq-${cx}-${tid}-f`);if(el)el.focus()},20)}}
  else if(d.qqsave){const [ctx,tid]=d.qqsave.split(':');salvarRapido(ctx,tid)}
  else if(d.qqfull){const tp=TOPIC[d.qqfull];qqOpen=null;if(MODAL)fecharModal();setEdit('questoes',null);limparForm('questoes');$('qArea').value=tp.area;$('qTema').value=LABEL[tp.id];$('qTipo').value=tipoPadrao(tp.id);irPara('questoes',$('qPanel'));setTimeout(()=>$('qFeitas').focus(),60);render()}
  else if(d.adiar!=null)adiar(+d.adiar);
  else if(d.ficha){if(TOPIC[d.ficha]){qqOpen=null;abrirModal({t:'ficha',id:d.ficha})}}
  else if(d.close)fecharModal();
  else if(d.fc)fcResp(d.fc);
  else if(d.edit){const [col,id]=d.edit.split(':');if(MODAL)fecharModal();editar(col,id)}
  else if(d.cancel){setEdit(d.cancel,null);limparForm(d.cancel)}
  else if(d.del){
    const [col,id]=d.del.split(':');const old=S[col].find(r=>r.id===id);
    delRec(col,id).then(()=>{if(EDIT[col]===id){setEdit(col,null);limparForm(col)}toast('Registro apagado.',old?()=>putRec(col,id,old):null)}).catch(()=>toast('Não foi possível apagar.'));
  }
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&MODAL){fecharModal();return}
  if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.lkenter){e.preventDefault();const [ctx,tid]=e.target.dataset.lkenter.split(':');salvarLink(ctx,tid);return}
  if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.qqenter){e.preventDefault();const [ctx,tid]=e.target.dataset.qqenter.split(':');salvarRapido(ctx,tid)}
});
document.addEventListener('click',async e=>{
  if(e.target.id!=='fSalvar'||!MODAL||MODAL.t!=='ficha')return;
  const tid=MODAL.id,old=S.notas[tid]?Object.assign({},S.notas[tid]):null;
  const obj={texto:$('fNota').value.slice(0,20000),link:$('fLink').value.trim().slice(0,1000),atualizado:Date.now()};
  try{await putNota(tid,obj);$('fNotaMsg').textContent='Salvo agora.';$('fLinkOut').innerHTML=/^https?:\/\//i.test(obj.link)?`<a href="${esc(obj.link)}" target="_blank" rel="noopener">Abrir link do material</a>`:''}
  catch(err){$('fNotaMsg').textContent=errMsg(err)}
});
$('prevW').onclick=()=>{semana=Math.max(0,semana-1);render()};
$('nextW').onclick=()=>{semana=Math.min(totalSemanas()-1,semana+1);render()};
$('nowW').onclick=()=>{semana=semanaAtual();render()};
$('replanFechar').onclick=()=>{replanAberto=false;render()};
$('usarDomingo').onchange=()=>render();
$('replanAplicar').onclick=()=>{const n=planoNovo($('usarDomingo').checked);if(!n)return;const before=snap();S.ag=n;replanAberto=false;semana=semanaAtual();render();saveTemas();toast('Plano refeito: a teoria termina em '+longo(fimTeoria())+'.',()=>restoreSnap(before))};
$('replanOriginal').onclick=()=>{const before=snap();S.ag={};replanAberto=false;render();saveTemas();toast('De volta ao plano original.',()=>restoreSnap(before))};
$('inicio').addEventListener('change',e=>{if(!isDate(e.target.value))return;S.cfg.inicio=segunda(e.target.value);S.ag={};semana=null;render();saveCfg();saveTemas();toast('Início em '+longo(S.cfg.inicio)+' (segunda-feira).')});
$('metaQ').addEventListener('change',e=>{const n=parseInt(e.target.value,10);if(!(n>=500&&n<=50000)){toast('Escolha uma meta entre 500 e 50.000 questões.');e.target.value=S.cfg.metaQ||8000;return}S.cfg.metaQ=n;render();saveCfg();toast('Meta: '+n.toLocaleString('pt-BR')+' questões.')});
$('revMax').addEventListener('change',e=>{const n=parseInt(e.target.value,10);if(!(n>=1&&n<=8)){toast('Escolha entre 1 e 8 revisões por dia.');e.target.value=S.cfg.revMax||3;return}S.cfg.revMax=n;render();saveCfg();toast('Até '+n+' revisões por dia.')});
PROVAS.forEach(p=>$('d-'+p.k).addEventListener('change',e=>{if(!isDate(e.target.value))return;S.cfg.provas[p.k]=e.target.value;render();saveCfg();toast(p.nome+' em '+longo(e.target.value)+'.')}));

// busca de tema
$('temasDL').innerHTML=TOPICS.map(t=>`<option value="${esc(LABEL[t.id])}"></option>`).join('');
function temaDe(v){v=(v||'').trim();if(!v)return '';return BY_LABEL[v]||BY_NOME[v.toLowerCase()]||null}
const areaOpts=AREAS.map(a=>`<option value="${a.k}">${a.nome}</option>`).join('');
$('qArea').innerHTML=areaOpts;$('eArea').innerHTML=areaOpts;
$('eFiltro').innerHTML='<option value="">Todas as áreas</option>'+areaOpts;
[['qTema','qArea'],['eTema','eArea']].forEach(([ti,ai])=>{
  $(ti).addEventListener('change',()=>{const id=temaDe($(ti).value);if(id){$(ai).value=TOPIC[id].area;$(ti).value=LABEL[id]}});
  $(ai).addEventListener('change',()=>{const id=temaDe($(ti).value);if(id&&TOPIC[id].area!==$(ai).value)$(ti).value=''});
});
$('buscaTema').addEventListener('change',()=>{const id=temaDe($('buscaTema').value);if(id){$('buscaTema').value='';abrirModal({t:'ficha',id})}});
$('buscaTema').addEventListener('keydown',e=>{if(e.key!=='Enter')return;const v=$('buscaTema').value.trim().toLowerCase();if(!v)return;const id=temaDe($('buscaTema').value)||(TOPICS.find(t=>t.nome.toLowerCase().includes(v))||TOPICS.find(t=>t.bonus.some(b=>b.toLowerCase().includes(v)))||{}).id;if(id){$('buscaTema').value='';abrirModal({t:'ficha',id})}else toast('Nenhum tema ou subtema com esse nome.')});
$('eFiltro').onchange=renderErros;$('eBusca').oninput=renderErros;$('eDom').onchange=renderErros;$('sFiltro').onchange=renderSimulados;
$('qData').value=hoje();$('eData').value=hoje();$('sData').value=hoje();
$('sAno').innerHTML='<option value="">Não é prova na íntegra</option>'+ANOS.map(a=>`<option value="${a}">${a}</option>`).join('');

$('hojeQ').onclick=()=>{
  setEdit('questoes',null);limparForm('questoes');
  const ss=slotsEm(hoje());if(ss.length){const t=TOPIC[SLOTS[ss[0]].tid];$('qArea').value=t.area;$('qTema').value=LABEL[t.id]}
  irPara('questoes',$('qPanel'));setTimeout(()=>$('qFeitas').focus(),60);
};

// formulário de questões
$('qForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const msg=$('qMsg'),f=parseInt($('qFeitas').value,10),c=parseInt($('qAcertos').value,10);
  if(!(f>0)){msg.textContent='Informe quantas questões você fez.';return}
  if(!(c>=0)||c>f){msg.textContent='Os acertos precisam estar entre 0 e '+f+'.';return}
  const tema=temaDe($('qTema').value);if(tema===null){msg.textContent='Escolha um tema da lista ou deixe o campo vazio.';return}
  const mot={};let ms=0;
  for(const [k,id] of [['ns','mNs'],['da','mDa'],['in','mIn']]){const v=$(id).value;if(v==='')continue;const n=parseInt(v,10);if(!(n>=0)){msg.textContent='Os motivos de erro precisam ser números.';return}mot[k]=n;ms+=n}
  if(ms>f-c){msg.textContent='Os motivos somam '+ms+', mas você errou '+(f-c)+'.';return}
  const area=tema?TOPIC[tema].area:$('qArea').value;
  const tipo=$('qTipo').value;
  if((tipo==='pre'||tipo==='pos')&&!tema){msg.textContent='Questões pré e pós precisam de um tema.';return}
  const rec={data:isDate($('qData').value)?$('qData').value:hoje(),area,tema:tema||'',tipo,feitas:f,acertos:c,mot,criado:Date.now()};
  const editing=!!EDIT.questoes,before=snap();
  try{
    const nid=await salvarRec('questoes',rec,msg,'Salvo: '+c+'/'+f+' ('+pct(c,f).toFixed(0)+'%).');
    if(!editing&&nid){const st=aplicaTipo(tema,tipo);const extra=(tipo==='pre'?'':aposQuestoes(tema,f,c))+(st==='done'?' Tema concluído.':st?' Etapa “'+TIPO[tipo]+'” marcada.':'');if(st)saveTemas();if(extra)msg.textContent+=extra;render();toast('Bloco salvo.',async()=>{await delRec('questoes',nid);restoreSnap(before)})}
    $('qArea').value=area;$('qFeitas').focus();
  }catch(err){msg.textContent=errMsg(err)}
});
// caderno de erros
$('eForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const msg=$('eMsg'),texto=$('eTexto').value.trim();
  if(!texto){msg.textContent='Escreva o que você aprendeu com a questão.';return}
  const tema=temaDe($('eTema').value);if(tema===null){msg.textContent='Escolha um tema da lista ou deixe o campo vazio.';return}
  const old=EDIT.erros?S.erros.find(x=>x.id===EDIT.erros):null;
  const rec={data:isDate($('eData').value)?$('eData').value:hoje(),area:tema?TOPIC[tema].area:$('eArea').value,tema:tema||'',mot:$('eMot').value,banca:$('eBanca').value,quest:$('eQuest').value.trim().slice(0,600),texto:texto.slice(0,4000),dom:old?!!old.dom:false,criado:Date.now()};
  try{const nid=await salvarRec('erros',rec,msg,'Anotado no caderno.');if(nid)toast('Anotado no caderno.',()=>delRec('erros',nid));$('eTexto').focus()}catch(err){msg.textContent=errMsg(err)}
});
$('fcAbrir').onclick=()=>{
  const L=errosFiltrados();if(!L.length)return;
  const deck=L.map(e=>e.id).sort(()=>Math.random()-.5);
  FC={deck,i:0,show:false,ok:0,again:0};abrirModal({t:'fc'});
};
// simulados
$('sRows').innerHTML=`<div class="arearow"><span class="lbl">Área</span><span class="lbl">Questões</span><span class="lbl">Acertos</span><span class="lbl" style="text-align:right">%</span></div>`+
  AREAS.map(a=>`<div class="arearow a-${a.k}"><label class="nm" for="sq-${a.k}"><span class="dot"></span><span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.nome}</span></label><input type="number" min="0" id="sq-${a.k}" inputmode="numeric" aria-label="Questões de ${a.nome}"><input type="number" min="0" id="sa-${a.k}" inputmode="numeric" aria-label="Acertos em ${a.nome}"><span class="num" id="sp-${a.k}" style="text-align:right"></span></div>`).join('');
function simLive(){let f=0,c=0;AREAS.forEach(a=>{const q=+$('sq-'+a.k).value||0,ac=+$('sa-'+a.k).value||0;const p=pct(ac,q);const el=$('sp-'+a.k);el.textContent=p==null?'':p.toFixed(0)+'%';el.className='num '+(p==null?'':pctClass(p));f+=q;c+=ac});const p=pct(c,f);$('sTotalLive').innerHTML=f?`Total: ${c}/${f} · <span class="${pctClass(p)}">${p.toFixed(1)}%</span>`:''}
$('sRows').addEventListener('input',simLive);
function renderChips(){$('sErrChips').innerHTML=sErr.map(t=>`<span class="chip">${esc(TOPIC[t].nome)}<button type="button" data-chiprm="${t}" aria-label="Remover ${esc(TOPIC[t].nome)}">×</button></span>`).join('')}
function addChip(){const id=temaDe($('sTemaErro').value);if(!id){toast('Escolha um tema da lista.');return}if(!sErr.includes(id))sErr.push(id);$('sTemaErro').value='';renderChips();$('sTemaErro').focus()}
$('sTemaAdd').onclick=addChip;
$('sTemaErro').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addChip()}});
$('sTemaErro').addEventListener('change',()=>{if(temaDe($('sTemaErro').value))addChip()});
$('sForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const msg=$('sMsg'),areas={};let erro='';
  AREAS.forEach(a=>{if(erro)return;const q=$('sq-'+a.k).value,ac=$('sa-'+a.k).value;if(q===''&&ac==='')return;const Q=parseInt(q,10),A=parseInt(ac||'0',10);
    if(!(Q>0)){erro='Informe o número de questões de '+a.nome+'.';return}
    if(!(A>=0)||A>Q){erro='Os acertos de '+a.nome+' precisam estar entre 0 e '+Q+'.';return}
    areas[a.k]={q:Q,a:A}});
  if(erro){msg.textContent=erro;return}
  if(!Object.keys(areas).length){msg.textContent='Preencha questões e acertos de pelo menos uma área.';return}
  const ano=parseInt($('sAno').value,10)||null;
  if(ano&&$('sProva').value==='Misto / cursinho'){msg.textContent='Prova na íntegra precisa de uma banca: SUS-SP, USP-SP ou ENARE.';return}
  const pend=temaDe($('sTemaErro').value);if(pend&&!sErr.includes(pend))sErr.push(pend);$('sTemaErro').value='';
  const temasErro=sErr.slice(),banca=$('sProva').value,editando=!!EDIT.simulados,before=snap();
  const rec={nome:$('sNome').value.trim().slice(0,120)||(ano?banca+' '+ano+' na íntegra':'Simulado '+banca),data:isDate($('sData').value)?$('sData').value:hoje(),prova:banca,ano,areas,temasErro,criado:Date.now()};
  try{
    const nid=await salvarRec('simulados',rec,msg,'Simulado salvo: '+simTot(rec).p.toFixed(1)+'% no total.');
    if(nid){
      temasErro.forEach(anteciparTema);if(temasErro.length){saveTemas();render()}
      if(temasErro.length)msg.innerHTML=esc(msg.textContent)+` Revisão antecipada de ${temasErro.length} tema(s). Anotar no caderno: `+temasErro.map(t=>`<button type="button" class="mini" data-anotar="${t}:${esc(banca)}">${esc(TOPIC[t].nome)}</button>`).join(' ');
      toast('Simulado salvo.',async()=>{await delRec('simulados',nid);restoreSnap(before)});
    }
  }catch(err){msg.textContent=errMsg(err)}
});

// ================= Exportar calendário =================
function eventosCal(dias,incluiRev){
  const h=hoje(),ini=h>S.cfg.inicio?h:S.cfg.inicio,P=provasOrd(),ult=P.length?P[P.length-1].data:fimTeoria();
  const fim=dias==='all'?ult:add(ini,+dias-1),ev=[],revs=incluiRev?revisoesAgendadas():[];
  for(let d=ini;d<=fim;d=add(d,1)){
    const f=faseDe(d),w=dow(d),pv=P.find(p=>p.data===d);
    if(pv){ev.push({d,t:'Prova: '+pv.nome,x:'Boa prova!'});continue}
    slotsEm(d).forEach(i=>{const s=SLOTS[i],t=TOPIC[s.tid];ev.push({d,t:t.nome+(s.of>1?' ('+(s.part+1)+'/'+s.of+')':'')+' · '+CURTA[t.area],x:dayHint(s)+'. Subtemas: '+t.bonus.join(', ')})});
    if(!slotsEm(d).length&&f>=1&&f<4){
      if(w===5)ev.push({d,t:f===1?((semanaIdx(d)+1)%4===0?'Simulado':'Questões mistas (60 a 80)'):'Simulado completo',x:'Lance o resultado no cronograma.'});
      else if(w<5&&f>=2){let b=null;if(f===2&&w===2)b=P[0]&&P[0].nome;if(f===3&&(w===1||w===3)){const r=P.filter(p=>p.data>=d).map(p=>p.nome);b=r.length?r[w===1?0:r.length-1]:null}
        ev.push({d,t:b?'Prova anterior: '+b+(provaSugerida(b)?' '+provaSugerida(b):''):'Revisão dirigida (temas escolhidos no dia)',x:'Abra o cronograma para ver os temas.'})}
    }
    const nr=revs.filter(r=>r.ef===d);if(nr.length)ev.push({d,t:'Revisões ('+nr.length+')',x:nr.map(r=>TOPIC[r.id].nome).join('; ')});
  }
  return ev;
}
const icsEsc=t=>String(t).replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n');
function gerarICS(ev){
  const st=new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';
  const L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Cronograma R1 2027//PT-BR','CALSCALE:GREGORIAN','X-WR-CALNAME:Cronograma R1'];
  ev.forEach((e,i)=>{const d=e.d.replace(/-/g,''),d2=add(e.d,1).replace(/-/g,'');L.push('BEGIN:VEVENT','UID:r1-'+d+'-'+i+'@cronograma-r1','DTSTAMP:'+st,'DTSTART;VALUE=DATE:'+d,'DTEND;VALUE=DATE:'+d2,'SUMMARY:'+icsEsc(e.t),'DESCRIPTION:'+icsEsc(e.x||''),'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+icsEsc(e.t),'TRIGGER:PT7H','END:VALARM','END:VEVENT')});
  L.push('END:VCALENDAR');return L.join('\r\n');
}
function gerarCSV(ev){const q=v=>'"'+String(v).replace(/"/g,'""')+'"';const md=d=>d.slice(5,7)+'/'+d.slice(8,10)+'/'+d.slice(0,4);return ['Subject,Start Date,All Day Event,Description'].concat(ev.map(e=>[q(e.t),md(e.d),'True',q(e.x||'')].join(','))).join('\r\n')}
async function baixar(nome,txt){
  try{const url=URL.createObjectURL(new Blob([txt],{type:nome.endsWith('.ics')?'text/calendar':nome.endsWith('.csv')?'text/csv':'application/octet-stream'}));const a=document.createElement('a');a.href=url;a.download=nome;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);return 'ok'}catch(e){return 'erro'}
}
async function exportarCal(fmt,dias,rev){
  const ev=eventosCal(dias,rev),msg=$('calMsg2')&&!$('modal').hidden?$('calMsg2'):$('calMsg');
  if(!ev.length){msg.textContent='Nada para exportar nesse período.';return}
  const r=await baixar('cronograma-r1-'+hoje()+'.'+fmt,fmt==='ics'?gerarICS(ev):gerarCSV(ev));
  msg.textContent=r==='ok'?`${ev.length} eventos exportados. `+(fmt==='ics'?'Abra o arquivo no celular ou importe no Google Agenda (Configurações > Importar).':'No Google Agenda: Configurações > Importar e exportar > Importar.'):r==='copiado'?'O download não está disponível aqui; o conteúdo foi copiado.':r==='cancelado'?'Download cancelado.':'Não foi possível exportar nesta visualização.';
}
$('calIcs').hidden=!ICS_OK;
$('calIcs').onclick=()=>exportarCal('ics',$('calPer').value,$('calRev').checked);
$('calCsv').onclick=()=>exportarCal('csv',$('calPer').value,$('calRev').checked);

// ================= Cronômetro =================
const TMK='cronoR1-timer',FOCO=25*60000,PAUSA=5*60000;
let TM={cat:'t',start:null,acc:0,mode:'livre',blk:0,brk:null,pomos:0};
try{const v=JSON.parse(localStorage.getItem(TMK)||'null');if(v&&typeof v.acc==='number')TM=Object.assign(TM,v)}catch(e){}
const tmSave=()=>{try{localStorage.setItem(TMK,JSON.stringify(TM))}catch(e){}};
const tmEl=()=>TM.acc+(TM.start?Date.now()-TM.start:0);
const fmt=ms=>{const s=Math.max(0,Math.round(ms/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const fmtH=ms=>{const s=Math.floor(ms/1000);return Math.floor(s/3600)+':'+String(Math.floor(s/60)%60).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
let audio=null;
function beep(){try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();[0,.35,.7].forEach(t=>{const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=880;g.gain.value=.08;o.connect(g);g.connect(audio.destination);o.start(audio.currentTime+t);o.stop(audio.currentTime+t+.18)})}catch(e){}}
function tmTick(){
  if(TM.mode==='pomo'&&TM.start&&tmEl()-TM.blk>=FOCO){
    TM.acc=TM.blk+FOCO;TM.start=null;TM.pomos++;TM.brk=Date.now();tmSave();beep();
    toast('Pomodoro '+TM.pomos+' concluído. Pausa de 5 minutos.');
  }
  if(TM.brk&&Date.now()-TM.brk>=PAUSA&&!TM.brkAvisou){TM.brkAvisou=true;tmSave();beep();toast('Fim da pausa. Hora do próximo pomodoro.')}
  tmUI();
}
function tmUI(){
  const pomo=TM.mode==='pomo',el=tmEl();
  if(pomo&&TM.brk){$('tmDisp').textContent=fmt(PAUSA-(Date.now()-TM.brk));$('tmSub').textContent='Pausa · '+TM.pomos+' pomodoro(s) · total '+fmtH(el)}
  else if(pomo){$('tmDisp').textContent=fmt(FOCO-(el-TM.blk));$('tmSub').textContent='Foco · '+TM.pomos+' pomodoro(s) · total '+fmtH(el)}
  else{$('tmDisp').textContent=fmtH(el);$('tmSub').textContent=''}
  $('tmStart').textContent=TM.start?'Pausar':TM.brk?'Próximo pomodoro':(el?'Continuar':'Iniciar');
  $('tmStop').disabled=!el;$('tmCat').value=TM.cat;$('tmModo').value=TM.mode;
}
$('tmStart').onclick=()=>{
  try{audio=audio||new (window.AudioContext||window.webkitAudioContext)()}catch(e){}
  if(TM.start){TM.acc+=Date.now()-TM.start;TM.start=null}
  else{if(TM.brk){TM.brk=null;TM.brkAvisou=false;TM.blk=TM.acc}TM.start=Date.now()}
  tmSave();tmUI();
};
$('tmModo').onchange=()=>{TM.mode=$('tmModo').value;TM.blk=TM.acc;TM.brk=null;tmSave();tmUI()};
$('tmCat').onchange=()=>{TM.cat=$('tmCat').value;tmSave()};
$('tmStop').onclick=async()=>{
  const min=Math.round(tmEl()/60000),cat=TM.cat;
  TM={cat,start:null,acc:0,mode:TM.mode,blk:0,brk:null,pomos:0};tmSave();tmUI();
  if(min<1){toast('Menos de 1 minuto: nada salvo.');return}
  try{const id=await addRec('tempo',{data:hoje(),cat,min,criado:Date.now()});toast(hm(min)+' de '+TCAT[cat].toLowerCase()+' registrados.',()=>delRec('tempo',id))}catch(e){toast(errMsg(e))}
};
$('tmAdd').onclick=async()=>{
  const min=parseInt($('tmMin').value,10),cat=$('tmCat2').value;
  if(!(min>0&&min<=720)){toast('Informe os minutos (1 a 720).');return}
  try{const id=await addRec('tempo',{data:hoje(),cat,min,criado:Date.now()});$('tmMin').value='';toast(hm(min)+' de '+TCAT[cat].toLowerCase()+' lançados.',()=>delRec('tempo',id))}catch(e){toast(errMsg(e))}
};
setInterval(()=>{if(TM.start||TM.brk)tmTick()},1000);
let ultimoDia=hoje();setInterval(()=>{if(hoje()!==ultimoDia){ultimoDia=hoje();semana=null;render()}},60000);

// ================= Backup =================
const COLS=['questoes','simulados','erros','tempo'];
const limpa=r=>{const o=Object.assign({},r);delete o.id;return o};
function pacote(){const o={app:'cronograma-r1',versao:3,exportado:new Date().toISOString(),cfg:S.cfg,prog:S.prog,ag:S.ag,notas:S.notas};COLS.forEach(c=>o[c]=S[c].map(limpa));return o}
$('bkBaixar').onclick=()=>{
  const json=JSON.stringify(pacote(),null,1),msg=$('bkMsg');
  try{const url=URL.createObjectURL(new Blob([json],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='cronograma-r1-backup-'+hoje()+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);msg.textContent='Backup baixado.'}
  catch(e){msg.textContent='Não foi possível baixar o backup neste navegador.'}
};
$('bkArquivo').addEventListener('change',e=>{
  const file=e.target.files&&e.target.files[0];e.target.value='';if(!file)return;
  const msg=$('bkMsg'),rd=new FileReader();
  rd.onload=()=>{
    let b;try{b=JSON.parse(rd.result)}catch(err){msg.textContent='Este arquivo não é um backup válido.';return}
    if(!b||b.app!=='cronograma-r1'||!Array.isArray(b.questoes)){msg.textContent='Este arquivo não é um backup deste cronograma.';return}
    restorePend=b;
    msg.innerHTML=`Backup de ${isDate((b.exportado||'').slice(0,10))?longo(b.exportado.slice(0,10)):'data desconhecida'}: ${Object.keys(b.prog||{}).length} temas com progresso, ${b.questoes.length} blocos de questões, ${(b.simulados||[]).length} simulados, ${(b.erros||[]).length} anotações, ${(b.tempo||[]).length} sessões de tempo. Isso substitui os dados atuais. <button type="button" class="danger" id="bkConfirma">Substituir</button> <button type="button" class="ghost" id="bkCancela">Cancelar</button>`;
    $('bkConfirma').onclick=restaurar;$('bkCancela').onclick=()=>{restorePend=null;msg.textContent=''};
  };
  rd.readAsText(file);
});
async function restaurar(){
  const b=restorePend,msg=$('bkMsg');if(!b)return;restorePend=null;
  msg.textContent='Restaurando…';
  try{
    S.cfg=normCfg(b.cfg);S.prog=b.prog||{};S.ag=b.ag||{};
    const notas=b.notas&&typeof b.notas==='object'?b.notas:{};
    if(modo==='db'){
      await db.doc('estudo/config').set({cfg:S.cfg});
      await db.doc('estudo/temas').set({p:S.prog,ag:S.ag});
      for(const id of Object.keys(S.notas))if(!notas[id])await db.collection('notas').doc(id).delete();
      for(const [id,n] of Object.entries(notas))if(TOPIC[id])await db.collection('notas').doc(id).set(n);
      for(const col of COLS){
        for(const r of S[col].slice())await db.collection(col).doc(r.id).delete();
        for(const r of (b[col]||[]))await db.collection(col).add(limpa(r));
      }
    }else{S.notas=notas;COLS.forEach(c=>S[c]=(b[c]||[]).map(r=>Object.assign(limpa(r),{id:newId()})));lsSave()}
    semana=null;render();msg.textContent='Backup restaurado.';
  }catch(err){msg.textContent='A restauração parou no meio. Tente de novo com o mesmo arquivo.'}
}

route();render();tmUI();conectar();
})();

// App instalável: registra o service worker (funciona offline depois da 1ª visita).
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}
