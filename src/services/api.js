import axios from 'axios';
import {Alert} from 'react-native';

export const apiKey = 'ecd878f5eb6f5ca388735c699adaff80';

const Api = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
});

export const getMovies = async page => {
  return Api.get(
    `/movie/popular?api_key=${apiKey}&language=pt-BR&page=${page}`,
  ).catch(err => {
    console.log(err);
  });
};

export const getSeries = async page => {
  return Api.get(
    `/tv/popular?api_key=${apiKey}&language=pt-BR&page=${page}`,
  ).catch(err => {
    console.log(err);
  });
};

export const getToken = async () => {
  return Api.get(`/authentication/token/new?api_key=${apiKey}`).catch(error => {
    console.log(err);
  });
};

export const validateToken = async (email, password, token) => {
  return Api
    .post(`/authentication/token/validate_with_login?api_key=${apiKey}`, {
      username: email,
      password: password,
      request_token: token,
    })
    .then(response =>
      Api
        .post(`/authentication/session/new?api_key=${apiKey}`, {
          request_token: response.data.request_token,
        })
        .catch(error => {
          Alert.alert('Atenção!', 'Usuário  ou senha inválidos');
        }),
    )
    .catch(error => {
      Alert.alert('Atenção!', 'Usuário ou senha inválidos');
    });
};

export const getAccount = async session_id => {
  return Api.get(`/account?api_key=${apiKey}&session_id=${session_id}`).catch(
    error => {
      console.log(error);
    },
  );
};

export const getTvShowSeason = async (id, season) => {
  return Api.get(
    `/tv/${id}/season/${season}?api_key=${apiKey}&language=pt-BR`,
  ).catch(error => {
    console.log('Error ao buscar detalhes das series', error);
  });
};

export const getSeriesDetails = async id => {
  return Api.get(`/tv/${id}?api_key=${apiKey}&language=pt-BR`).catch(error => {
    console.log('Erro', error);
  });
};

export default Api;
