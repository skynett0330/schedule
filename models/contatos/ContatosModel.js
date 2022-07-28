const pool = require("../../database/database");

module.exports =  class ContatosModel {

static  insertEv(contatos,callback){
return  pool.query("insert into agenda.agendamentos(nome,entidade,cargo,endereco,telefone,email,data,obs,horain,horaend)values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[contatos.nome,contatos.entidade,contatos.cargo,contatos.endereco,contatos.telefone,contatos.email,contatos.data,contatos.obs,contatos.horaIn,contatos.horaEnd],callback)
}
static getAllEv(callback){
  return pool.query("select * from agenda.agendamentos order  by data asc",callback)
}

static deletOneEv(id,callback){
  return pool.query("delete from agenda.agendamentos where id_contato = $1",[id],callback)
}
static editar(id,body,callback){
  return pool.query('update agenda.agendamentos set nome=$1,entidade=$2,data=$3,cargo=$4,endereco=$5,telefone=$6,email=$7,obs=$8 where id_contato =$9',[body.nome, body.entidade,body.data,body.cargo,body.endereco, body.telefone, body.email, body.obs, id],callback)
}
static getIdContatos(id,callback){
  return pool.query("select * from agenda.agendamentos where id_contato= $1",[id],callback)
}

  static getTodos(callback) {
    return pool.query("select * from mrh.pessoa", callback);
  }

  static getOne(matricula, callback) {
    return pool.query(
      "select * from mrh.pessoa_situacao_atual as psa inner join mrh.pessoa_2 as p on(p.id_pessoa = psa.id_pessoa) inner join mrh.pessoa_contato as pc on (pc.id_pessoa = psa.id_pessoa) where matricula =$1",
      [matricula.mat],
      callback
    );
  }
  static getOneContato(matricula, callback) {
    return pool.query(
      "select * from mrh.pessoa_contato where id_pessoa_contato = $1",
      [matricula],
      callback
    );
  }

  static getContatos(callback) {
    return pool.query(
      "select * from mrh.pessoa_contato where id_pessoa_contato = $1",
      callback
    );
  }

  static getInnerPessoa(callback) {
    return pool.query(
      "select * from mrh.pessoa_2 join mrh.cargo ON mrh.cargo.id_cargo =  CAST ( mrh.pessoa_2.oid_cargo_sgp  AS integer )",
      callback
    );
  }

  static getMatricula(matricula,callback){
    return pool.query("select * from mrh.pessoa_situacao_atual as psa inner join mrh.pessoa_contato as pc on (psa.id_pessoa = pc.id_pessoa) inner join mrh.pessoa_endereco as pe on (psa.id_pessoa = pe.id_pessoa)inner join mrh.orgao as o on (psa.id_orgao = o.id_orgao)inner join mrh.funcao as f on (psa.id_funcao = f.id_funcao)inner join mrh.cargo as c on (psa.id_cargo = c.id_cargo)inner join mrh.organizacao as org on (psa.id_organizacao_disp = org.id_organizacao)  inner join mrh.pessoa as pes on (psa.id_pessoa =pes.id_pessoa)where matricula =$1 ",[matricula.matricula],callback) 
  }

  static insertList(list,callback){
    return pool.query('insert into agenda.lista_tel_bpm(descricao,telefone,email)values($1,$2,$3)'[list.dList,list.tList,list.eList],callback)
  }
};
