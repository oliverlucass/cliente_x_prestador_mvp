export type OfferStatus = "Fechada" | "Em negociação" | "Não fechada";

export interface ServiceOffer {
  id: string;
  firstName: string;
  neighborhood: string;
  title: string;
  amount: number;
  status: OfferStatus;
  recency: string;
}

type OfferInput = [
  firstName: string,
  title: string,
  neighborhood: string,
  recency: string,
  amount: number,
  status: OfferStatus,
];

const offersByService: Record<string, OfferInput[]> = {
  "1": [
    ["Marina", "Troca de 6 tomadas", "Vila Mariana", "há 2 dias", 120, "Fechada"],
    ["Rafael", "Disjuntor desarmando", "Saúde", "há 5 dias", 150, "Fechada"],
    ["Camila", "Instalar chuveiro elétrico", "Moema", "há 1 semana", 95, "Em negociação"],
    ["Bruno", "Revisão do quadro", "Aclimação", "há 2 semanas", 260, "Não fechada"],
    ["Juliana", "Ponto novo na cozinha", "Paraíso", "há 3 semanas", 85, "Fechada"],
    ["Pedro", "Troca do disjuntor geral", "Ipiranga", "há 4 dias", 90, "Fechada"],
    ["Ana", "Luminária na sala", "Pinheiros", "há 6 dias", 194, "Não fechada"],
    ["Lucas", "Tomada 20A", "Tatuapé", "há 8 dias", 100, "Fechada"],
    ["Fernanda", "Curto no quarto", "Perdizes", "há 9 dias", 184, "Em negociação"],
    ["Diego", "Ventilador de teto", "Lapa", "há 10 dias", 110, "Fechada"],
    ["Carla", "Campainha sem som", "Santana", "há 3 dias", 174, "Fechada"],
    ["Thiago", "Espelho de tomada", "Vila Madalena", "há 1 mês", 120, "Não fechada"],
    ["Beatriz", "Fiação do chuveiro", "Campo Belo", "há 11 dias", 164, "Fechada"],
    ["Paulo", "Quadro desorganizado", "Jabaquara", "há 2 meses", 130, "Fechada"],
    ["Renato", "Interruptor paralelo", "Liberdade", "há 12 dias", 154, "Em negociação"],
    ["Helena", "Arandela no corredor", "Bela Vista", "há 13 dias", 135, "Fechada"],
    ["André", "Tomada no banheiro", "Santa Cecília", "há 4 semanas", 149, "Fechada"],
    ["Sofia", "LED na varanda", "Vila Clementino", "há 15 dias", 140, "Fechada"],
    ["Gustavo", "Chuveiro caindo", "Brooklin", "há 5 semanas", 144, "Não fechada"],
    ["Larissa", "Falta de fase", "Cambuci", "há 16 dias", 148, "Fechada"],
    ["Felipe", "Disjuntor do ar", "Consolação", "há 6 semanas", 136, "Fechada"],
    ["Patrícia", "Instalar exaustor", "Barra Funda", "há 17 dias", 155, "Em negociação"],
    ["Henrique", "Troca de soquete", "Mooca", "há 18 dias", 129, "Fechada"],
    ["Aline", "Refletor da garagem", "Ipiranga", "há 7 semanas", 165, "Fechada"],
    ["Marcelo", "Tomada queimada", "Saúde", "há 19 dias", 119, "Não fechada"],
    ["Vanessa", "Lustre da sala", "Moema", "há 20 dias", 175, "Fechada"],
    ["Rodrigo", "Sensor de presença", "Paraíso", "há 8 semanas", 109, "Fechada"],
    ["Tatiane", "Campainha inteligente", "Aclimação", "há 21 dias", 185, "Em negociação"],
    ["Eduardo", "Fio aparente", "Vila Mariana", "há 22 dias", 99, "Fechada"],
    ["Priscila", "Quadro com cheiro", "Pinheiros", "há 3 meses", 88, "Não fechada"],
    ["Leonardo", "Troca de tomada USB", "Tatuapé", "há 23 dias", 196, "Fechada"],
    ["Cristina", "Iluminação do jardim", "Perdizes", "há 24 dias", 98, "Fechada"],
    ["Daniel", "Disjuntor DR", "Lapa", "há 9 semanas", 186, "Em negociação"],
    ["Elisa", "Ponto para cooktop", "Santana", "há 25 dias", 108, "Fechada"],
    ["Otávio", "Reparo na extensão", "Vila Madalena", "há 26 dias", 176, "Não fechada"],
    ["Sabrina", "Revisão da fiação", "Campo Belo", "há 10 semanas", 118, "Fechada"],
    ["Igor", "Tomada solta", "Jabaquara", "há 27 dias", 166, "Fechada"],
    ["Letícia", "Instalar plafon", "Liberdade", "há 4 meses", 142, "Fechada"],
  ],
  "2": [
    ["Helena", "Guarda-roupa de casal", "Aclimação", "há 3 dias", 180, "Fechada"],
    ["André", "Painel da sala", "Paraíso", "há 1 semana", 220, "Fechada"],
    ["Sofia", "Mesa e cadeiras", "Moema", "há 4 dias", 140, "Em negociação"],
    ["Gustavo", "Prateleiras do quarto", "Vila Mariana", "há 2 semanas", 95, "Não fechada"],
    ["Larissa", "Cômoda e criado", "Ipiranga", "há 6 dias", 160, "Fechada"],
    ["Felipe", "Painel e nichos", "Brooklin", "há 3 semanas", 250, "Fechada"],
  ],
  "3": [
    ["Patrícia", "Diária da casa", "Saúde", "há 2 dias", 180, "Fechada"],
    ["Henrique", "Limpeza de mudança", "Bela Vista", "há 5 dias", 260, "Em negociação"],
    ["Aline", "Cozinha e banheiros", "Moema", "há 1 semana", 150, "Fechada"],
    ["Marcelo", "Pós-festa", "Vila Mariana", "há 4 dias", 200, "Não fechada"],
    ["Vanessa", "Apartamento 2 quartos", "Paraíso", "há 2 semanas", 190, "Fechada"],
  ],
  "4": [],
  "5": [
    ["Rodrigo", "Torneira da cozinha", "Moema", "há 1 dia", 90, "Fechada"],
    ["Tatiane", "Vazamento no banheiro", "Saúde", "há 3 dias", 140, "Fechada"],
    ["Eduardo", "Descarga fraca", "Aclimação", "há 6 dias", 110, "Em negociação"],
    ["Priscila", "Sifão da pia", "Vila Mariana", "há 1 semana", 80, "Não fechada"],
    ["Leonardo", "Registro geral", "Ipiranga", "há 2 semanas", 160, "Fechada"],
    ["Cristina", "Desentupimento", "Brooklin", "há 4 dias", 190, "Fechada"],
    ["Daniel", "Torneira do tanque", "Cambuci", "há 3 semanas", 100, "Fechada"],
  ],
  "6": [
    ["Elisa", "Poda da cerca", "Brooklin", "há 2 dias", 140, "Fechada"],
    ["Otávio", "Vasos da varanda", "Moema", "há 1 semana", 90, "Em negociação"],
    ["Sabrina", "Grama e folhas", "Vila Mariana", "há 5 dias", 160, "Fechada"],
    ["Igor", "Adubação", "Saúde", "há 2 semanas", 70, "Não fechada"],
    ["Letícia", "Jardim de inverno", "Paraíso", "há 3 semanas", 200, "Fechada"],
  ],
  "7": [
    ["Nina", "Passeio da tarde", "Paraíso", "há 1 dia", 45, "Fechada"],
    ["Caio", "Passeio em dupla", "Vila Mariana", "há 3 dias", 60, "Fechada"],
    ["Lívia", "Cuidado no feriado", "Moema", "há 1 semana", 80, "Em negociação"],
    ["Hugo", "Passeio curto", "Saúde", "há 4 dias", 40, "Não fechada"],
    ["Maya", "Dois passeios", "Aclimação", "há 2 semanas", 90, "Fechada"],
    ["Davi", "Passeio noturno", "Ipiranga", "há 6 dias", 50, "Fechada"],
  ],
  "8": [
    ["Rita", "Limpeza do split", "Cambuci", "há 3 dias", 160, "Fechada"],
  ],
  "9": [
    ["Vera", "Apartamento pós-obra", "Bela Vista", "há 2 dias", 320, "Fechada"],
    ["Natan", "Limpeza de mudança", "Vila Mariana", "há 5 dias", 280, "Fechada"],
    ["Clara", "Poeira da reforma", "Moema", "há 1 semana", 350, "Em negociação"],
    ["Ivo", "Cozinha pós-obra", "Saúde", "há 2 semanas", 240, "Não fechada"],
  ],
  "10": [
    ["Eva", "Prateleira do quarto", "Santa Cecília", "há 2 dias", 95, "Fechada"],
    ["Gil", "Suporte de TV", "Vila Mariana", "há 4 dias", 140, "Fechada"],
    ["Lia", "Nichos da sala", "Moema", "há 1 semana", 180, "Em negociação"],
    ["Ruy", "Varal de teto", "Saúde", "há 6 dias", 110, "Não fechada"],
    ["Bia", "Quadros na parede", "Paraíso", "há 2 semanas", 80, "Fechada"],
    ["Tom", "Painel ripado", "Aclimação", "há 3 semanas", 260, "Fechada"],
    ["Mel", "Suporte de micro-ondas", "Ipiranga", "há 8 dias", 90, "Fechada"],
    ["Ari", "Prateleira do banheiro", "Brooklin", "há 1 mês", 70, "Não fechada"],
  ],
  "11": [
    ["Lua", "Troca de chuveiro", "Vila Clementino", "há 2 dias", 75, "Fechada"],
    ["Benício", "Chuveiro e tomada", "Saúde", "há 5 dias", 120, "Em negociação"],
    ["Isabela", "Disjuntor do banheiro", "Moema", "há 1 semana", 95, "Fechada"],
    ["Cauã", "Luminária do corredor", "Vila Mariana", "há 3 dias", 85, "Não fechada"],
    ["Zoe", "Troca de soquete", "Aclimação", "há 2 semanas", 70, "Fechada"],
  ],
  "12": [
    ["Kelly", "Torneira da pia", "Chácara Santo Antônio", "há 1 dia", 80, "Fechada"],
    ["Ian", "Sifão vazando", "Moema", "há 4 dias", 95, "Fechada"],
    ["Amanda", "Registro do banheiro", "Saúde", "há 1 semana", 110, "Em negociação"],
    ["Téo", "Torneira do tanque", "Vila Mariana", "há 6 dias", 70, "Não fechada"],
    ["Luan", "Vazamento simples", "Paraíso", "há 2 semanas", 130, "Fechada"],
    ["Otto", "Pia da cozinha", "Aclimação", "há 3 semanas", 100, "Fechada"],
  ],
};

function toOffers(serviceId: string, rows: OfferInput[]): ServiceOffer[] {
  return rows.map(([firstName, title, neighborhood, recency, amount, status], index) => ({
    id: `${serviceId}-${index + 1}`,
    firstName,
    title,
    neighborhood,
    recency,
    amount,
    status,
  }));
}

export function offersForService(serviceId: string): ServiceOffer[] {
  return toOffers(serviceId, offersByService[serviceId] ?? []);
}

export function summarizeOffers(offers: readonly ServiceOffer[]) {
  if (offers.length === 0) return null;

  const total = offers.reduce((sum, offer) => sum + offer.amount, 0);
  const amounts = offers.map((offer) => offer.amount);

  return {
    count: offers.length,
    average: Math.round(total / offers.length),
    min: Math.min(...amounts),
    max: Math.max(...amounts),
  };
}
