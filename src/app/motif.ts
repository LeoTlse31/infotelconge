import * as moment from 'moment-business-days';

export class Motif {

  public motifsList = [
    { sn: 'SS', libele: 'Congés sans solde' },
    { sn: 'CP', libele: 'Congé payé' },
    { sn: 'PC', libele: 'Pont client (si pas déjà fait collectivement)' },
    { sn: 'RC', libele: 'Récupération pour astreinte ou jours fériés' },
    { sn: 'CE', libele: 'Congé exceptionnel (preciser le motif)' }
 ];

  constructor(

  ) {

  }

  public getMotifBySN(name: string) {
    for (let i = 0; i < this.motifsList.length; i++) {
      if (this.motifsList[i].sn === name) {
        return this.motifsList[i].libele;
      }
    }

  }
}
