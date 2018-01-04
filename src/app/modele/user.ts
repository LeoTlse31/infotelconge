export class User {


	public id: number;
	public emailResp: string;
	public societe: string;
	public matricule: number;
	public profilComplet: boolean;

	constructor(public nom: string, public prenom: string, public email: string, public password: string) {
		this.emailResp = null;
		this.societe = null;
		this.matricule = null;
		this.profilComplet = false;
	}


}