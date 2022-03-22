import logger from '@wdio/logger';
import { default as Reporter } from '@wdio/allure-reporter';

class Logger {
  private log;

  public constructor() {
    this.log = logger('default');
  }

  public info(message: string) {
    this.log.info(message);
    Reporter.addStep(message);
  }

  public debug(message: string) {
    this.log.debug(message);
  }

  public error(message: string) {
    this.log.error(message);
  }

  public warn(message: string) {
    this.log.warn(message);
  }

  public trace(message: string) {
    this.log.trace(message);
  }
  public silent(message: string) {
    this.log.silent(message);
  }

  
}

export default new Logger();
