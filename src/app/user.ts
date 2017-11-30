export class User {

  constructor(
    public id: number,
    public nom: string,
    public prenom: string,
	public email: string,
	public password: string,
    public emailResp: string,
	public societe: string,
	public matricule: number
  ) {  }

  
}