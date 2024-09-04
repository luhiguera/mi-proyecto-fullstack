module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        jasmine: {
          
        },
        clearContext: false // para que la consola de Karma muestre los resultados sin limpiar
      },
      jasmineHtmlReporter: {
        suppressAll: true // elimina los duplicados de resultados
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage'),
        subdir: '.',
        reporters: [
          { type: 'html' },  // Genera un reporte HTML para la cobertura
          { type: 'text-summary' },  // Muestra un resumen en la consola
          { type: 'lcov' },  // Genera un reporte lcov para integración con SonarQube
          { type: 'text' }
        ],
        check: {
          global: {
            statements: 85, // Requerir una cobertura del 85% para que pase el test
            branches: 85,
            functions: 85,
            lines: 85
          }
        }
      },
      reporters: ['progress', 'kjhtml', 'coverage'], // Incluye el reporte de cobertura
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['ChromeHeadless'], // Configura Chrome sin interfaz gráfica (útil para CI/CD)
      singleRun: false,
      restartOnFileChange: true
    });
  };  