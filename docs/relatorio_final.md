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
Um software de clínica médica é uma ferramenta essencial para garantir a eficiência e qualidade no atendimento médico. Com ele, é possível o agendamento consultas de forma fácil e rápida, facilitando o acesso dos pacientes aos profissionais da saúde. Além disso, o software permite o registro completo do histórico médico do paciente, incluindo diagnósticos e tratamentos anteriores. Isso torna o acompanhamento da saúde do paciente mais preciso e seguro.


## 2. Participantes do processo

Pacientes: São usuários com idade entre 18 e 65+, que têm o papel de acessar o sistema para se cadastar ou, se já cadastrados, marcar consultas para si mesmos ou para menores de idade, como filhos, sobrinhos ou netos.

Médicos: São usuários com formação acadêmica na área da saúde, seu papel é acessar o sistema para visualizar consultas já marcadas pelos pacientes da clínica.

Funcionários: São usuários que já foram contratados para fazer a gestão da clínica dentro do software como: gestão financeira, cadastro de médicos e controle de estoque.


## 3. Modelagem do processo de negócio

## 3.1. Análise da situação atual

Quando o assunto é gestão de clínicas médicas, a maioria delas ainda realiza as atividades manualmente. Entre essas atividades, destacam-se o agendamento de consultas, a atualização do prontuário, o cadastro de médicos, o gerenciamento financeiro e o controle de estoque. Nosso objetivo é automatizar todos os processos para agilizar e proporcionar mais segurança, evitando a perda de dados da clínica.

Com relação ao agendamento de consultas, é possível implementar melhorias, como uma maior facilidade e autonomia para os clientes.

Já o prontuário pode ser aprimorado permitindo uma fácil edição pelo paciente e pelo médico responsável.

O cadastro de médicos pode ser aprimorado com a inclusão de informações adicionais sobre a especialização dos profissionais, a integração com o agendamento e prontuário, para maior integração dos sistemas.

No que diz respeito ao gerenciamento financeiro, é possível registrar de maneira prática os pagamentos das consultas com implementação de métricas para avaliar dados desses registros.

Por fim, no que diz respeito ao controle de estoque, é possível implementar um registro eficiente dos itens em um banco de dados, permitindo a atualização das informações dos produtos em estoque de forma precisa e confiável.

Em suma, a análise da situação atual das clínicas médicas mostra que a implementação dessas melhorias nos sistemas e ferramentas pode otimizar o atendimento aos pacientes, melhorar o desempenho financeiro e aprimorar a gestão dos recursos da clínica.

## 3.2. Descrição Geral da proposta

O primeiro passo para iniciar os processos de uma clínica médica gerenciada pela MedHelp é cadastrar médicos que farão parte da equipe. Para isso, um funcionário da clínica realizará uma entrevista com o médico interessado e, ao ser aceito, suas informações serão coletadas e agregadas ao sistema, tais como nome completo, especialidade, telefone(s) e e-mail.

Com os médicos contratados, a clínica estará preparada para receber pacientes, e o papel do software é facilitar o agendamento. Por meio do sistema, o cliente que já fez login poderá visualizar uma lista de médicos disponíveis e, ao selecioná-lo, será direcionado para a tela de escolha do dia e horário.

No momento do atendimento, o médico estará logado em sua conta e a com ficha do paciente cadastrada na clínica, ele terá acesso ao prontuário do paciente que contém informações importantes para a consulta, como, por exemplo, alergias e cirurgias feitas.

Outra funcionalidade do sistema é o registro de pagamentos. Os funcionários realizam o registro dos pagamentos das consultas utilizando o ID da consulta, especificando o valor, o método de pagamento e se foi realizado através de plano de saúde.

Para complementar, o software possui a opção de controle de estoque de ferramentas para os médicos, onde o funcionário consegue adicionar e editar ferramentas usadas na clínica.

Enfim, é importante ressaltar que a plataforma MedHelp visa facilitar, agilizar e organizar os processos de uma clínica médica. No entanto, é importante ter em mente que há limitações do sistema, já que processos manuais, como entrevistas de contratação e consultas, necessitam da intervenção humana para funcionarem adequadamente.

## 3.3. Modelagem dos Processos

### 3.3.1 Processo 1 – CADASTRO DE MÉDICOS

O primeiro processo se inicia com a etapa de admissão de novos médicos na MedHelp, sendo feita por meio de uma entrevista conduzida por um funcionário da clínica. Após a entrevista, caso o médico seja aprovado, serão solicitadas informações adicionais, como nome completo, especialidade, telefone(s) e e-mail, que serão fornecidas pelo médico, e agregadas ao sistema pela equipe da clínica, mantendo um cadastro completo de todos os médicos da equipe.

![Modelo BPMN do PROCESSO 1](/assets/processos/Cadastro_De_Medicos.png "Modelo BPMN do Processo 1.")


### 3.3.2 Processo 2 – AGENDAMENTO DE CONSULTAS

Após a contratação dos médicos, a clínica já está pronta para receber seus pacientes e, para isso, eles precisam marcar um horário de atendimento com o profissional desejado. O sistema mostra para o paciente os horários disponíveis e ao agendar em um desses horários o software atualizar os dados automaticamente. 

![Modelo BPMN do PROCESSO 2](/assets/processos/Agendamento_De_Consulta.jpg "Modelo BPMN do Processo 2.")

### 3.3.3 Processo 3 -PRONTUÁRIO MÉDICO
Com as informações disponíveis no banco de dados, o médico poderá acessá-las durante a consulta para verificar o histórico médico do paciente, identificar possíveis alergias e cirurgias previamente feitas, entre outras informações importantes que podem ajudar no diagnóstico e tratamento do paciente.

Ao final da consulta, o médico poderá acrescentar novas observações relevantes no prontuário médico do paciente, como a prescrição de medicamentos, exames solicitados, recomendações de cuidados em casa, entre outras informações importantes. Isso garante que todas as informações relevantes para o tratamento do paciente fiquem armazenadas em um só lugar e possam ser acessadas facilmente em consultas futuras.

![Modelo BPMN do PROCESSO 3](/assets/processos/Prontuario_Medico.jpg "Modelo BPMN do Processo 3.")


### 3.3.4 Processo 4 – CONTROLE DE ESTOQUE
Ao acessar o estoque, um funcionário pode cadastrar um novo equipamento, informando o nome e a quantidade disponível em estoque. Além de adicionar novos itens, o funcionário também tem a opção de editar o estoque, podendo modificar o nome ou a quantidade de qualquer um dos equipamentos previamente adicionados. Além disso, há a possibilidade de excluir um equipamento do estoque, caso necessário.

![Modelo BPMN do PROCESSO 4](/assets/processos/Controle_de_Estoque.jpg "Modelo BPMN do Processo 4.")

### 3.3.5 Processo 5 – CADASTRO DE PAGAMENTO 

Após a conclusão da consulta, o paciente se dirige à recepção para efetuar o pagamento à clínica. Um funcionário da clínica, então, confirma se o paciente possui plano de saúde e se o plano tem cobertura para a clínica em questão. Após o pagamento ser realizado o funcionário da clínica abre a página de cadastro de pagamento e registra o pagamento no sistema.  
![Exemplo de um Modelo BPMN do PROCESSO 5](/assets/processos/cadastroDePagamento.png "Modelo BPMN do Processo 5.")

## 4. Projeto da Solução

### 4.1. Detalhamento das atividades

Descrever aqui cada uma das propriedades das atividades de cada um dos processos. Devem estar relacionadas com o modelo de processo apresentado anteriormente.

#### Processo 1 – CADASTRO DE MEDICOS

**Cadastrar dados pessoais do médico**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Nome Completo do médico | Caixa de Texto | Apenas letras e tamanho máximo de 50 caracteres | - |
| UF | Caixa de Texto | Apenas letras maiusculas e máximo de 2 caracteres | - |
| CRM | Caixa de Texto | 6 caracteres | - |
| Especialidade | Caixa de Texto | Apenas letras e tamanho máximo de 50 caracteres | - |
| Situação | Caixa de Texto | Múltipla escolha | - |
| Telefone | Caixa de Texto | Mínimo de 7 e máximo de 10 caracteres | -  |
| E-mail | Caixa de Texto | Formato de e-mail | - | 
|    |    |     |

#### Processo 2 – AGENDAMENTO DE CONSULTAS

**Escolher médico**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Nome do médico e especialidade | Tabela | - | Nada selecionado |
|    |    |     |


**Selecionar data**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Calendário com dias do mês selecionado | Seleção única | - | Nada selecionado |
|    |    |     |

**Agendar horário**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Cartão com informações do horário selecionado | Seleção única | - | Nada selecionado |
|    |    |     |

### Processo 3 - Prontuário Médico 

**Prontuário do paciente**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Nome do paciente | Caixa de Texto | Apenas letras e tamanho máximo de 15 caracteres | - |
| CPF do paciente | Caixa de Texto | Deve ter 11 caracteres | - | 
| Telefone | Caixa de Texto | Mínimo de 7 e máximo de 10 caracteres | -  |
| Data de Nascimento | Caixa de Data | Formato de data | - | 
| Alergias | Caixa de Texto | - | - |
| Cirurgias já feitas | Caixa de Texto |  | - |
| Observações | Caixa de texto | - | - |
|    |    |     |

**Atualizar Prontuário**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Alergias | Caixa de Texto | - | - |
| Cirurgias já feitas | Caixa de Texto |  | - |
| Observações | Caixa de texto | - | - |
|    |    |     |

#### Processo 4 – CONTROLE DE ESTOQUE

**Cadastrar equipamentos**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Nome do equipamento | Caixa de Texto | Tamanho máximo de 45 caracteres | - |
| Quantidade | Caixa de Texto | Apenas números | - |
|    |    |     |

**Editar estoque**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Nome do equipamento | Caixa de Texto | Tamanho máximo de 45 caracteres | - |
| Quantidade | Caixa de Texto | Apenas números | - |
|    |    |     |

#### Processo 5 – CADASTRO DE PAGAMENTO

**Registrar pagamento no sistema**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Id da consulta correspondente | Caixa de texto | Apenas números inteiros | - |
| Data do Pagamento | Calendário virtual | DD/MM/AA | - |
| Tipo de pagamento | Radio Button | [PIX] ou [Cartão de Crédito] ou [Boleto] | - |
| Valor do Pagamento | Caixa de texto | Apenas valores numéricos com os decimais separados por "." | - |
| Pagamento com Plano de Saúde | Radio Button | [SIM] ou [NÃO] | - |
|    |    |     |


### 4.2. Tecnologias

As tecnologias utilizadas serão:

- HTML, CSS e JavaScript para o desenvolvimento Front-End;
- Node JS para o desenvolvimento Back-End;
- MySQL para a criação do Banco de Dados;
- Git e Github para o controle de versão e armazenamento do código;
- Figma para o desenvolvimento do Design;
- WhatsApp e Discord para a comunicação entre o grupo.

## 5. Modelo de dados

**[Modelo de Entidade Relacionamento Físico]**<br>
![Modelo de Entidade Relacionamento Físico](/assets/processos/modelo_fisico_bd.jpg "Modelo de Entidade Relacionamento Físico")

## 6. Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores.

Usar o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Cálculo** | **Fonte dados** | **Perspectiva** |
| --- | --- | --- | --- | --- | --- |
| Horários de agendamento mais usado | Avaliar qual o horário mais movimentado na clínica | Descobre qual o horário de consulta mais marcado | ((Quantidade do horário mais marcado * 100)/(Total dos agendamentos)) | Tabela consulta | Controle de movimento na clínica |
| Quantidade de pacientes que fizeram cirurgia | Saber a quantidade de pacientes que já fizeram cirurgia | Ter noção da porcentagem de cirurgias feitas em pacientes na clínica no mês | (Quantidade de pacientes que já fizeram cirurgia * 100)/(Total de pacientes)  | Tabela prontuário | Conhecimento |
| Frequência dos tipos de pagamento | Avaliar qual o método de pagamento mais é usado pelos pacientes | Descobre qual o método de pagamento mais usado | ((Quantidade do pagamento mais usado * 100)/(Total dos pagamentos))  | Tabela Pagamentos | Conhecimento sobre as vendas |
| Total de pagamentos com plano de saúde no mês atual | Avaliar a quantidade de clientes que usam o plano de saúde médico | Número de pacientes que usam o plano de saúde para o pagamento | (Total de pagamentos realizados no mês) - (Total de pagamentos realizados no mês sem plano de saúde) | Tabela pagamentos | Fazer uma análise e relatórios com mais eficiência no plano de saúde |
| Quantidade de pacientes que tem alguma alergia | Saber a quantidade de pacientes que já tem alguma alergia | Ter noção da quantidade de pacientes da clínica que tem alguma alergia | (Quantidade de pacientes que tem alguma alergia * 100)/(Total de pacientes)  | Tabela prontuário | Conhecimento |

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




