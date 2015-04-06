function NameService() {

  function name(name){
    return name;
  }

  return {
    name: name 
  };
}

angular
  .module('appName.module')
  .factory('NameService', [NameService]);