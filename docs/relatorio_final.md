# MedHelp


**Letícia Rodrigues Blom de Paula, leticiarblom@gmail.com**

**Arthur Capanema Bretas, arthurcbretas@gmail.com**

**Igor Miranda Santos, igormsprofissional@gmail.com**

**Júlia Borges Araújo Silva, juliaborgesfacul@gmail.com**

**Gabriel Vitor de Oliveira Morais, gabrielvitor0309@gmail.com**

---

Professores:

**Hugo Bastos de Paula**

**Eveline Alonso Veloso**


---

_Curso de Engenharia de Software, Unidade Praça da Liberdade_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_**Resumo**. Escrever aqui o resumo. O resumo deve contextualizar rapidamente o trabalho, descrever seu objetivo e, ao final, 
mostrar algum resultado relevante do trabalho (até 10 linhas)._

---


## 1. Introdução


    1.1 Contextualização

Entendendo a saúde como um direito humano básico, que deve ser assegurado da melhor maneira estratégica possível, (JÚNIOR; PENHA; SILVA, 2013), e, juntamente, considerando o uso da tecnologia no campo da saúde um acontecimento relativamente recente, iniciado a pouco mais de 25 anos, (WECHSLER et al., 2003), pode-se deduzir que há oportunidades para aprimoramento na integração das duas áreas, aproveitando o potencial da tecnologia como meio para impulsionar importantes progressos na área da medicina. 

Também, sendo a existência de um software adequado ao sistema, um componente fundamental para qualquer iniciativa relacionada à gestão de saúde, é crucial a utilização de softwares de qualidade para um bom funcionamento da gestão e atendimento de um ambiente médico. (COSTA; ORLOVKI, 2014).

Assim, o trabalho se desenvolve em função de ser um sistema de software feito como um facilitador tanto para a empresa como para o usuário, respectivamente, profissionais da saúde e pacientes, procurando sempre atender as necessidades dos clientes e prezando pela facilidade de acesso dos prestadores de serviço.


    1.2 Problema
Uma clínica médica enfrenta vários problemas de organização, que inclui, agendamento de pacientes, manter um registro preciso de suas consultas, sincronização de dados e falta de organização no armazenamento desses dados. Que são causados por seu sistema de gerenciamento pouco integrado e que faz uso de tecnologias ultrapassadas.

Esses diversos problemas tornam essencial a criação de um sistema de software mais preparado para gerir e organizar a rotina dessas unidades de saúde. 


    1.3 Objetivo geral
Com base nas informações e dados apresentados, torna-se evidente a grande necessidade de desenvolver um sistema de software que possa melhorar significativamente a qualidade das clínicas e a experiência dos usuários.


        1.3.1 Objetivos específicos
Para amenizar a maioria dos problemas relacionados ao agendamento de consultas, é fundamental desenvolver um software com o objetivo de oferecer:
- Comodidade aos pacientes em qualquer localidade e a qualquer momento, por meio do agendamento online. 
- O software deve visar a melhoria substancial da experiência do paciente, reduzindo filas e esperas para o agendamento de consultas. 
-  Proporcionar um atendimento mais eficiente e ágil. 
Com essa solução tecnológica, é possível simplificar o processo de agendamento, com:
- Aumento da precisão das informações registradas
- Diminuição das chances de erros 
- Garantia de um fluxo mais rápido e organizado de pacientes no hospital ou clínica. 
Dessa forma, o software de agendamento contribui para a otimização dos recursos de saúde e para o aumento da satisfação e fidelização dos pacientes.


    1.4 Justificativas

Com a crescente demanda por atendimento médico, a implementação de um software de clínica médica pode ser uma solução efetiva para melhorar a qualidade do atendimento aos pacientes. Além disso, essa tecnologia pode aumentar a eficiência operacional, facilitar o gerenciamento de informações, otimizar a tomada de decisão e, principalmente, garantir a segurança dos pacientes. Com todas essas vantagens, investir em um software de clínica médica é uma escolha inteligente para quem deseja melhorar o desempenho da clínica ou consultório médico.
Um software de clínica médica é uma ferramenta essencial para garantir a eficiência e qualidade no atendimento médico. Com ele, é possível o agendamento consultas de forma fácil e rápida, facilitando o acesso dos pacientes aos profissionais da saúde. Além disso, o software permite o registro completo do histórico médico do paciente, incluindo diagnósticos, tratamentos anteriores e prescrição de medicamentos. Isso torna o acompanhamento da saúde do paciente mais preciso e seguro.


## 2. Participantes do processo

Pacientes: São usuários com idade entre 18 e 65+, que têm o papel de acessar o sistema para se cadastar ou, se já cadastrados, marcar consultas para si mesmos ou para menores de idade, como filhos, sobrinhos ou netos.

Médicos: São usuários com formação acadêmica na área da saúde, seu papel é acessar o sistema para visualizar consultas já marcadas pelos pacientes da clínica.

Atendentes: São usuários que já foram contratados para fazer a gestão da clínica dentro do software como: gestão financeira, cadastro de médicos e atendimento ao cliente.


## 3. Modelagem do processo de negócio

## 3.1. Análise da situação atual

Quando o assunto é gestão de clínicas médicas, a maioria delas ainda realiza as atividades manualmente. Entre essas atividades, destacam-se a agenda eletrônica, o prontuário eletrônico, o cadastro de médicos, o gerenciamento financeiro e os relatórios gerenciais. Nosso objetivo é automatizar todos os processos para agilizar e proporcionar mais segurança, evitando a perda de dados da clínica.

Com relação à agenda eletrônica, é possível implementar melhorias, como personalização de lembretes para reduzir faltas às consultas, visualização do histórico de consultas dos pacientes para planejamento das próximas consultas e integração com sistemas de telemedicina.

Já o prontuário eletrônico pode ser aprimorado com a integração com a agenda eletrônica, permitindo o agendamento de consultas e exames diretamente no sistema, compartilhamento de informações entre profissionais autorizados e acesso aos prontuários dos pacientes em tempo real.

O cadastro de médicos pode ser aprimorado com a inclusão de informações adicionais sobre a formação e experiência dos profissionais, a implementação de um sistema de avaliação pelos pacientes e a integração com a agenda eletrônica e prontuário eletrônico para maior integração dos sistemas.

No que diz respeito ao gerenciamento financeiro, a geração de relatórios financeiros em tempo real e a integração com sistemas de gestão de estoque podem ajudar a clínica a ter uma visão geral mais precisa de seu desempenho financeiro e gerenciar melhor seus recursos.

Por fim, quanto aos relatórios gerenciais, pode-se incluir informações sobre a disponibilidade dos médicos e relatórios de fluxo de pacientes.

Em suma, a análise da situação atual das clínicas médicas mostra que a implementação dessas melhorias nos sistemas e ferramentas pode otimizar o atendimento aos pacientes, melhorar o desempenho financeiro, aprimorar a gestão dos recursos e profissionais da saúde.

## 3.2. Descrição Geral da proposta

A ideia consiste em um sistema de software abrangente, projetado para administrar clínicas médicas de maneira eficaz e ordenada. O software deve possuir recursos que facilitem o gerenciamento de todos os aspectos da clínica, desde o agendamento de consultas e o monitoramento dos pacientes até o controle financeiro e o estoque de medicamentos.

Dentre as principais funcionalidades do sistema, destacam-se:

Calendário virtual: possibilita que a clínica agende consultas e organize a agenda dos médicos de forma prática e ágil, permitindo a visualização de horários vagos e o registro de novas consultas com poucos cliques.

Prontuário digital: o software deve proporcionar o armazenamento e acesso às informações dos pacientes, como histórico de consultas e resultados de exames.

Administração financeira: o software deve possibilitar o gerenciamento de gastos e receitas da clínica.

O objetivo principal é fornecer uma solução completa e eficiente para a administração da clínica, automatizando processos e proporcionando uma experiência superior para pacientes e colaboradores.

## 3.3. Modelagem dos Processos

### 3.3.1 Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN.

![Exemplo de um Modelo BPMN do PROCESSO 1](imagens/process.png "Modelo BPMN do Processo 1.")


### 3.3.2 Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Exemplo de um Modelo BPMN do PROCESSO 2](imagens/call_process.png "Modelo BPMN do Processo 2.")

## 4. Projeto da Solução

### 4.1. Detalhamento das atividades

Descrever aqui cada uma das propriedades das atividades de cada um dos processos. Devem estar relacionadas com o modelo de processo apresentado anteriormente.

#### Processo 1 – NOME DO PROCESSO

**Nome da atividade 1**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| [Nome do campo] | [Área de texto, Caixa de texto, Número, Data, Imagem, Seleção única, Múltipla escolha, Arquivo, Link, Tabela] |  |  |
| ***Exemplo:***  |    |     |
| login | Caixa de Texto | formato de e-mail |  |
| senha | Caixa de Texto | mínimo de 8 caracteres |   |

**Nome da atividade 2**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| [Nome do campo] | [Área de texto, Caixa de texto, Número, Data, Imagem, Seleção única, Múltipla escolha, Arquivo, Link, Tabela] |  |  |
|    |    |     |

#### Processo 2 – NOME DO PROCESSO

**Nome da atividade 1**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| [Nome do campo] | [Área de texto, Caixa de texto, Número, Data, Imagem, Seleção única, Múltipla escolha, Arquivo, Link, Tabela] |  |  |
|    |    |     |

**Nome da atividade 2**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| [Nome do campo] | [Área de texto, Caixa de texto, Número, Data, Imagem, Seleção única, Múltipla escolha, Arquivo, Link, Tabela] |  |  |
|    |    |     |

### 4.2. Tecnologias

Descreva qual(is) tecnologias você vai usar para resolver o seu problema, ou seja implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas. Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## 5. Modelo de dados

Apresente o modelo de dados por meio de um modelo relacional ou Diagrama de Entidade-Relacionamento (DER) que contemple todos conceitos e atributos apresentados item anterior. 

![Diagrama de Entidade Relacionamento de Exemplo](imagens/er_diagram.png "Diagrama de Entidade Relacionamento de Exemplo")

## 6. Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores.

Usar o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Cálculo** | **Fonte dados** | **Perspectiva** |
| --- | --- | --- | --- | --- | --- |
| Percentual reclamações | Avaliar quantitativamente as reclamações | Percentual de reclamações em relação ao total atendimento |   | Tabela reclamações | Aprendizado e Crescimento |
| Taxa de Requisições abertas | Melhorar a prestação de serviços medindo a porcentagem de requisições | Mede % de requisições atendidas na semana | ![\frac{\sum{atendidas}}{\sum{requisicoes}}100](https://latex.codecogs.com/svg.latex?\frac{\sum{atendidas}}{\sum{requisicoes}}100) | Tabela solicitações | Processos internos |
| Taxa de entrega de material | Manter controle sobre os materiais que estão sendo entregues | Mede % de material entregue dentro do mês |   | Tabela Pedidos | Clientes |

Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe **a ser proposto**

## 7.Sistema desenvolvido

Faça aqui uma breve descrição do software e coloque as principais telas com uma explicação de como usar cada uma.

## 8. Conclusão

Apresente aqui a conclusão do seu trabalho. Discussão dos resultados obtidos no trabalho, onde se verifica as observações pessoais de cada aluno. Poderá também apresentar sugestões de novas linhas de estudo.

# REFERÊNCIAS

*[1.1]* - _JUNIOR, Ivo PG; PENHA, L. M.; SILVA, C. M.. *A importância da tecnologia da informação como ferramenta para o processo da gestão hospitalar no setor privado: um estudo de caso em uma organização hospitalar em Feira de Santana (BA)*. Revista de Gestão em Sistemas de Saúde - RGSS, São Paulo, v. 2, n. 1, p. 91-115, jan./jun. 2013.

*[1.2]* - _WECHSLER, R. et al. *A informática no consultório médico*. Jornal de Pediatria, [S. l.], ano 2003, v. 79, n. 1, p. 3-12, 3 mar. 2003. Disponível em: https://core.ac.uk/reader/193076380. Acesso em: 27 fev. 2023.

*[1.3]* - _Costa, Karine. Orlovski, Regiane *A Importânicia da Utilização do Software na Área da Saúde*. Revista Científica Semana Acadêmica. Fortaleza, ano MMXIV, Nº. 000050, 06/03/2014. Disponível em: https://semanaacademica.org.br/artigo/importancia-da-utilizacao-do-software-na-area-da-saude. Acesso em: 28 fev. 2023.


# APÊNDICES

**Colocar link:**

Do código (armazenado no repositório);

Dos artefatos (armazenado do repositório);

Da apresentação final (armazenado no repositório);

Do vídeo de apresentação (armazenado no repositório).




