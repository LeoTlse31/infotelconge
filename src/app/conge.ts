import * as moment from 'moment-business-days';

export class Conge {

  public id: number;
  public duree: number;

  constructor(
    public dateDeb: string,
    public dateFin: string,
    public motif: string,
    public precision: string,
    public idUser: number,
    public demiJournee: string
  ) {


    const Noel = '25-12-2017';
    const JourDeLan = '01-01-2018';
    const Epiphanie = '06-01-2018';
    const MardiGras = '13-02-2018';
    const SaintValentin = '14-02-2018';
    const Paques = '02-04-2018';
    const FeteTravail = '01-05-2018';
    const Victoire = '08-05-2018';
    const Ascension = '10-05-2018';
    const Pentecote = '21-05-2018';
    const FeteNationale = '14-07-2018';
    const Assomption = '15-08-2018';
    const Toussaint = '01-11-2018';
    const Armistice = '11-11-2018';
    const Noel2018 = '25-12-2018';


    moment.locale('fr', {
      holidays: [Noel, JourDeLan, Epiphanie, MardiGras, SaintValentin, Paques, FeteTravail, Victoire, Ascension, Pentecote,
        FeteNationale, Assomption, Toussaint, Armistice, Noel2018],
      holidayFormat: 'DD-MM-YYYY'
    });
    this.calculateDuration();
  }

  public calculateDuration() {

    this.duree = moment(this.dateDeb, 'YYYY-MM-DD').businessDiff(moment(this.dateFin, 'YYYY-MM-DD'));
    if (this.duree === 0 ) { this.duree = 0.5;}


  }



  getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = startDate;
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (!((dayOfWeek === 6) || (dayOfWeek === 0))) {
        count++;
        curDate.setDate(curDate.getDate() + 1);

      }
    }
    return count;
  }

}
