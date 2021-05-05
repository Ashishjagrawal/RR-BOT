const { WaterfallDialog, ComponentDialog, DialogTurnStatus } = require('botbuilder-dialogs');

const {ConfirmPrompt, ChoicePrompt, DateTimePrompt, NumberPrompt, TextPrompt } = require('botbuilder-dialogs');


const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
const TEXT_PROMPT = 'TEXT_PROMPT';
const DATETIME_PROMPT = 'DATETIME_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class MakeReservationDialog extends ComponentDialog {
    constructor(){
        super(MakeReservationDialog)


    this.addDialog(new TextPrompt(TEXT_PROMPT));
    this.addDialog(new NumberPrompt(NUMBER_PROMPT, this.agePromptValidator));
    this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
    this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
    this.addDialog(new DateTimePrompt(DATETIME_PROMPT));
    this.addDialog(new WaterfallDialog(WATERFALL_DIALOG,  [

    ]));

    this.firstStep.bind(this),  //Ask confirmation if user wants to make reservation
    this.getName.bind(this), //Get Name from user
    this.getNumberOfParticipants.bind(this), //Number of Participants for reservation
    this.getDate.bind(this),  //Date of reservation
    this.getTime.bind(this),  //Time of reservation
    this.confirmStep.bind(this),  //Show summery of values entered by user and ask confirmation to make reservation
    this.summeryStep.bind(this)

    this.initialDialogId = WATERFALL_DIALOG;
    }


    async run(turnContext, accessor) {
        const dialogSet = newDialogSet(accessor);
        dialogSet.add(this);
        const dialogContext = await dialogSet.createContext(turnContext);

        const results = await dialogContext.continueDialog();
        if(results.status === DialogTurnStatus.empty){
            await dialogContext.beginDialog(this.id);
        }

        const results = await dialogContext.continueDialog();
        if(results.status === DialogTurnStatus.empty){
            await dialogContext.beginDialog(this.id);
        }

        
    }

    async firstStep(step){
        //Running a step here means the next Waterfall step will be run when the user response is received
        return await step.prompt(CONFIRM_PROMPT, 'Would you like to make a reservation?', ['yes', 'no']);
    }

    async getName(step){
        if(step.result === true){
            return await step.prompt(TEXT_PROMPT, 'In what name reservation is to be made?')
        }
    }
    
    async getNumberOfParticipants(step){
        step.values.name = step.result;
        return await step.prompt(NUMBER_PROMPT, 'How Many Participants(1-150)?')
    }



}