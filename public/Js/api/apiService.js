const API_PATH = '../../Config/api.config.json';

const getApiConfigData = async () => {
  return await fetch(API_PATH)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export class ApiService {
  static apiBaseInstance = null;
  static getApiBase = async () => {
    console.log('[apiService.js]<ApiService - getApiBase()>: Getting api.');
    if (this.apiBaseInstance == null) {
      try {
        console.log(
          '[apiService.js]<ApiService - getApiBase()>: Api doesnt exist, getting api base from config.',
        );
        let configData = await getApiConfigData();
        this.apiBaseInstance =
          configData.api_protocal +
          '://' +
          configData.api_base +
          ':' +
          configData.api_port +
          '/api/' +
          configData.api_version +
          '/';
      } catch (error) {
        console.error(
          '[apiService.js]<ApiService - getApiBase()>: Some errors occur when  getting api from configuration file, check error below this line',
        );
        console.error(error);
        throw error;
      }
    }
    console.log(
      '[apiService.js]<ApiService - getApiBase()>: Getting api finished.',
    );
    console.log(
      '[apiService.js]<ApiService - getApiBase()>: Api base: ' + this.apiBaseInstance,
    );
    return this.apiBaseInstance;
  };
}
