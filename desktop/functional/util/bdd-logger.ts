import {default as Logger} from './logger';
class BddLogger {
    public Given(msg) {
        Logger.info("Given: "+msg);
    }

    public When(msg) {
        Logger.info("When: "+msg);
    }

    public Then(msg) {
        Logger.info("Then: "+msg);
    }

    public And(msg) {
        Logger.info("And: "+msg);
    }

    public But(msg) {
        Logger.info("But: "+msg);
    }
}

const bddLoggerObj = new BddLogger();

const Given = bddLoggerObj.Given;
const When = bddLoggerObj.When;
const Then = bddLoggerObj.Then;
const And = bddLoggerObj.And;
const But = bddLoggerObj.But;

export {Given, When, Then, And, But};