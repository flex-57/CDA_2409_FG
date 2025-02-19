///////////////////////////////////////////////////////////
//  Bouteille.cs
//  Implementation of the Class Bouteille
//  Generated by Enterprise Architect
//  Created on:      11-f�vr.-2025 11:29:03
//  Original author: FGessa
///////////////////////////////////////////////////////////




public class Bouteille {

	private float _contenanceEnLitre;
	private float _contenuEnLitre;
	private bool _estOuverte;

	public float contenanceEnLitre { 
		get {
			return _contenanceEnLitre;
		} 
		set {
			_contenanceEnLitre = value;
		}
	}
	public float contenuEnLitre { 
		get {
			return _contenuEnLitre;
		} 
		set {
			_contenuEnLitre = value;
		}
	}
	public bool estOuverte { 
		get {
			return _estOuverte;
		} 
		set {
			_estOuverte = value;
		}
	}

	public Bouteille() :this(float _contenanceEnLitre, float _contenuEnLitre, bool _estOuverte){

	}

	/// 
	/// <param name="_contenanceEnLitre"></param>
	/// <param name="_contenuEnLitre"></param>
	/// <param name="_estOuverte"></param>
	public Bouteille(float _contenanceEnLitre, float _contenuEnLitre, bool _estOuverte){
		contenanceEnLitre = _contenanceEnLitre;
		contenuEnLitre = _contenuEnLitre;
		estOuverte = _estOuverte;
	}

	/// 
	/// <param name="_bouteilleACopier"></param>
	public Bouteille(Bouteille _bouteilleACopier) :this(float _contenanceEnLitre, float _contenuEnLitre, bool _estOuverte){

	}

	public bool Fermer(){

		return false;
	}

	public bool Ouvrir(){

		return false;
	}

	/// 
	/// <param name="_quantite"></param>
	public bool Remplir(float _quantite){

		return false;
	}

	/// 
	/// <param name="_quantite"></param>
	public bool Vider(float _quantite){

		return false;
	}

}//end Bouteille