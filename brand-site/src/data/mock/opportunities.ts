import type { Opportunity } from "@/types/opportunity";

export const opportunities: Opportunity[] = [
  {
    id: "op-1", title: "Instalar 3 luminárias na sala", category: "Elétrica", budget: 220, budgetLabel: "R$ 150 a R$ 220",
    description: "Já tenho as luminárias e preciso apenas da instalação. O apartamento tem fácil acesso e vaga para prestador.",
    distance: 1.4, neighborhood: "Vila Mariana", city: "São Paulo", dateLabel: "Hoje", timeLabel: "Depois das 18h", publishedAt: "há 18 min",
    clientName: "Mariana Lopes", clientImageUrl: "/images/ana.jpg", clientRating: 4.9, completedHires: 12, verified: true,
    imageUrl: "/images/eletrica.jpg", imageAlt: "Luminárias que precisam ser instaladas", urgent: true, availableToday: true, interests: 3,
  },
  {
    id: "op-2", title: "Montar guarda-roupa de 6 portas", category: "Montagem", budget: 240, budgetLabel: "Até R$ 240",
    description: "Móvel novo, ainda nas caixas. O manual e todas as peças estão disponíveis no local.",
    distance: 2.1, neighborhood: "Aclimação", city: "São Paulo", dateLabel: "Sábado", timeLabel: "Das 9h às 14h", publishedAt: "há 35 min",
    clientName: "Felipe Rocha", clientImageUrl: "/images/rafael.jpg", clientRating: 5, completedHires: 8, verified: true,
    imageUrl: "/images/montagem.jpg", imageAlt: "Guarda-roupa para montagem", availableWeekend: true, interests: 5,
  },
  {
    id: "op-3", title: "Pintura de um quarto pequeno", category: "Pintura", budget: 450, budgetLabel: "R$ 350 a R$ 450",
    description: "Quarto de aproximadamente 10 m². A parede está em bom estado e a tinta já foi comprada.",
    distance: 3.2, neighborhood: "Pinheiros", city: "São Paulo", dateLabel: "Data flexível", timeLabel: "Período a combinar", publishedAt: "há 1 h",
    clientName: "Larissa Campos", clientImageUrl: "/images/luciana.jpg", clientRating: 4.8, completedHires: 5, verified: true,
    imageUrl: "/images/pintura.jpg", imageAlt: "Quarto que precisa de pintura", interests: 7,
  },
  {
    id: "op-4", title: "Limpeza completa pós-mudança", category: "Limpeza", budget: 300, budgetLabel: "Até R$ 300",
    description: "Apartamento vazio com 70 m², dois quartos e dois banheiros. Materiais de limpeza podem ser fornecidos.",
    distance: 3.5, neighborhood: "Saúde", city: "São Paulo", dateLabel: "Sexta-feira", timeLabel: "A partir das 8h", publishedAt: "há 2 h",
    clientName: "Rodrigo Alves", clientImageUrl: "/images/carlos.jpg", clientRating: 4.9, completedHires: 19, verified: true,
    imageUrl: "/images/limpeza.jpg", imageAlt: "Apartamento para limpeza pós-mudança", interests: 9,
  },
  {
    id: "op-5", title: "Consertar vazamento na torneira", category: "Reparos", budget: 130, budgetLabel: "Até R$ 130",
    description: "A torneira da cozinha pinga mesmo fechada. Preciso de diagnóstico e reparo no mesmo atendimento, se possível.",
    distance: 4, neighborhood: "Moema", city: "São Paulo", dateLabel: "Hoje", timeLabel: "Entre 14h e 19h", publishedAt: "há 2 h",
    clientName: "Patrícia Melo", clientImageUrl: "/images/ana.jpg", clientRating: 5, completedHires: 7, verified: true,
    imageUrl: "/images/hidraulica.jpg", imageAlt: "Torneira de cozinha com vazamento", availableToday: true, interests: 2,
  },
  {
    id: "op-6", title: "Poda e limpeza de jardim pequeno", category: "Jardinagem", budget: 190, budgetLabel: "R$ 160 a R$ 190",
    description: "Jardim térreo com cerca viva e duas árvores pequenas. Ferramentas próprias serão necessárias.",
    distance: 5.1, neighborhood: "Brooklin", city: "São Paulo", dateLabel: "Domingo", timeLabel: "Pela manhã", publishedAt: "há 3 h",
    clientName: "Eduardo Lima", clientImageUrl: "/images/marcos.jpg", clientRating: 4.7, completedHires: 4, verified: false,
    imageUrl: "/images/jardinagem.jpg", imageAlt: "Jardim residencial que precisa de poda", availableWeekend: true, interests: 4,
  },
  {
    id: "op-7", title: "Instalar suporte de TV na parede", category: "Montagem", budget: 150, budgetLabel: "Até R$ 150",
    description: "TV de 50 polegadas e suporte articulado já comprados. Parede de alvenaria.",
    distance: 5.4, neighborhood: "Paraíso", city: "São Paulo", dateLabel: "Amanhã", timeLabel: "Depois das 16h", publishedAt: "há 4 h",
    clientName: "Camila Torres", clientImageUrl: "/images/luciana.jpg", clientRating: 4.9, completedHires: 11, verified: true,
    imageUrl: "/images/montagem.jpg", imageAlt: "Suporte para instalação de televisão", interests: 6,
  },
  {
    id: "op-8", title: "Trocar chuveiro elétrico", category: "Elétrica", budget: 110, budgetLabel: "R$ 110",
    description: "Chuveiro novo já está no apartamento. Preciso retirar o antigo e fazer a instalação com segurança.",
    distance: 5.8, neighborhood: "Vila Clementino", city: "São Paulo", dateLabel: "Sábado", timeLabel: "Horário a combinar", publishedAt: "há 5 h",
    clientName: "Bruno Martins", clientImageUrl: "/images/joao.jpg", clientRating: 5, completedHires: 14, verified: true,
    imageUrl: "/images/eletrica.jpg", imageAlt: "Chuveiro elétrico para instalação", availableWeekend: true, interests: 8,
  },
];
