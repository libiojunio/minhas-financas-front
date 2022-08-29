import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../views/login/Login';
import Cadastro from '../../views/cadastro/Cadastro';
import Home from '../../views/home/Home';
import {
  ROTA_CADASTRO_USUARIOS,
  ROTA_CADASTRO_LANCAMENTOS,
  ROTA_CONSULTA_LANCAMENTOS,
  ROTA_HOME,
  ROTA_LOGIN, _USUARIO_LOGADO
} from '../../utils/constantes';
import ConsultaLancamentos from '../../views/lancamentos/ConsultaLancamentos';
import CadastroLancamentos from '../../views/lancamentos/CadastroLancamentos';
import {withRouter} from '../../componentes/withRouter';
import LocalStorageService from '../../services/outros/LocalStorageService';
import AuthService from '../../services/authService/AuthService';

class Rotas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isTokenValido(){
    const _usuario_logado = LocalStorageService.getItemObj(_USUARIO_LOGADO);
    if (_usuario_logado && _usuario_logado.token) {
     if (Date.now() > new Date(_usuario_logado.dataHoraExpiracaoToken)){
       this.props.setIsUsuarioAutenticado();
       AuthService.limparDadosUsuarioLogado();
       this.props.navigate(ROTA_LOGIN);
     }
    }
    else {
      return false;
    }
    return true;
  }

  render() {
    if (this.props.isUsuarioAutenticado && this.isTokenValido()){
      return (
        <Routes>
          <Route path={ROTA_HOME} element={<Home />} />
          <Route path={ROTA_LOGIN}
                 element={<Login setIsUsuarioAutenticado={this.props.setIsUsuarioAutenticado}/>} />
          <Route path={ROTA_CADASTRO_USUARIOS} element={<Cadastro />} />
          <Route path={ROTA_CONSULTA_LANCAMENTOS} element={<ConsultaLancamentos />} />
          <Route path={ROTA_CADASTRO_LANCAMENTOS}>
            <Route index element={<CadastroLancamentos />} />
            <Route path=":id" element={<CadastroLancamentos />} />
          </Route>
        </Routes>
      );
    }
    else {
      if (
        this.props.location.pathname !== ROTA_CADASTRO_USUARIOS &&
        this.props.location.pathname !== ROTA_LOGIN){
        this.props.navigate(ROTA_LOGIN);
      }

      return (
        <Routes>
          <Route path={ROTA_CADASTRO_USUARIOS} element={<Cadastro />} />
          <Route path={ROTA_LOGIN}
                 element={<Login setIsUsuarioAutenticado={this.props.setIsUsuarioAutenticado}/>} />
        </Routes>
      );
    }
  }
}

export default withRouter(Rotas);
