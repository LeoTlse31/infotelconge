export class User {


	public id: number;
	public emailResp: string;
	public societe: string;
	public matricule: number;
	public profilComplet: boolean;
	public compteValide: boolean;
	public token : string;
	constructor(public nom: string, public prenom: string, public email: string, public password: string) {
		this.emailResp = null;
		this.societe = null;
		this.matricule = null;
		this.profilComplet = false;
		this.compteValide = false;
	}


}