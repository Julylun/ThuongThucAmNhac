const API_PATH = '../../Config/api.config.json';

const getApiConfigData = async () => {
  try {
    let apiData = await fetch(API_PATH)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
      if(apiData == null) {
        throw new Error('Cannot get api data from api config file')
      }
      return apiData;
  } catch (error) {
    console.error('[apiService.js]<getApiConfigData()>: Some errors occur when fetching api config data, check error below this line');
    console.error(error);
    return null;
  }
};

/**
 * Class for managing api base url which connect to the server backend
 */
class ApiService {
  static apiBaseInstance = null;

  /**
   * Get the base url of the api
   * @returns {string} Return the base url of the api
   */
  static getApiBase = async () => {
    if (this.apiBaseInstance == null) {
      try {
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
          // console.log('[apiService.js]<ApiService - getApiBase()>: Api base: ' + this.apiBaseInstance);
      } catch (error) {
        console.error('[apiService.js]<ApiService - getApiBase()>: Some errors occur when  getting api from configuration file, check error below this line');
        console.error(error);
        throw error;
      }
    }
    // console.log('[apiService.js]<ApiService - getApiBase()>: Getting api finished.');
    console.log('[apiService.js]<ApiService - getApiBase()>: Api base: ' + this.apiBaseInstance);
    return this.apiBaseInstance
  };
}


export default ApiService;