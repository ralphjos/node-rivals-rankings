/**
 * setMains
 *
 * A simple task that sets the main characters of each player
 */
var log = require('captains-log')();
var dict = require('dict');
var Promise = require('bluebird');

module.exports = function () {

	  const FORSBURN = "Forsburn";
	  const ZETTERBURN = "Zetterburn";
	  const WRASTOR = "Wrastor";
	  const ABSA = "Absa";
	  const MAYPUL = "Maypul";
	  const KRAGG = "Kragg";
	  const ORCANE = "Orcane";
	  const ETALUS = "Etalus";

	  const KRAIG = "Kraig";

	  const MAINS = dict({
			"ralphjos": [ORCANE],
			"LightTheWaiter": [ABSA],
			"RiskyCB": [ETALUS],
			"FullStream": [WRASTOR],
			"AZCards": [KRAGG],
			"TheFailWhale": [KRAGG],
			"gracefulknight": [ABSA],
			"Vector5": [WRASTOR],
			"Arcanine87": [ETALUS],
			"CakeAssault": [FORSBURN],
			"PikaThePikachu": [ZETTERBURN],
			"ATMA": [ORCANE],
			"Aurecia": [ABSA],
			"_MSB": [KRAGG],
			"LBO": [ZETTERBURN],
			"forsalex": [FORSBURN],
			"MrLz": [MAYPUL],
			"ProDoubleSushi": [FORSBURN],
			"TheDuoDesign": [MAYPUL],
			"Kisuno": [FORSBURN],
			"Cupz": [ZETTERBURN],
			"KZClimb": [KRAIG, ETALUS],
			"Sino5": [ZETTERBURN],
			"Foxboy3525": [ZETTERBURN],
			"Edobo": [ABSA],
			"ceztellz": [ABSA],
			"baaliam": [ETALUS],
			"Aura_KurtKoopa": [MAYPUL],
			"DolphinBrick": [ORCANE],
			"SactoStyle": [ZETTERBURN],
			"ReidlosToof": [ABSA],
			"Nevereatcars": [MAYPUL],
			"SmashG0D": [WRASTOR],
			"Smucatelli": [KRAGG],
			"ICE_JCOnyx": [ABSA],
			"The_Dunkmaster": [KRAGG],
			"ICleanWindows": [WRASTOR],
			"guyron": [ORCANE],
			"That_0ne_Guy": [KRAGG],
			"goldenelite96": [ZETTERBURN],
			"Jorane": [ABSA],
			"General_Stink": [ORCANE],
			"ITS_A_CAT": [KRAGG],
			"ngOr": [MAYPUL],
			"NekoLantern": [MAYPUL],
			"halfwaycrookk": [ZETTERBURN],
			"Geqqo": [KRAGG],
			"Master_Of_Disaster": [ZETTERBURN],
			"Narross": [ZETTERBURN],
			"Walnut356": [ZETTERBURN],
			"OzyLellowen": [ABSA],
			"coffeebreak": [MAYPUL],
			"MunkyHero": [KRAGG],
			"Wigg_": [KRAGG],
			"TAYZE_Tayze": [FORSBURN],
			"Theomach": [ZETTERBURN],
			"SawseBawse": [],
			"FH_Not_Falco": [WRASTOR],
			"Sp0rks": [],
			"MechaSoul": [ABSA],
			"UG_NPT_Ronin": [ZETTERBURN],
			"Cluf": [KRAGG],
			"Tanto": [ORCANE],
			"RJDollarSign": [ORCANE],
			"zxamike": [KRAGG],
			"Sparx21": [KRAGG],
			"tylion": [],
			"BigDiehl": [],
			"owneironaut": [WRASTOR],
			"Quote_a": [ORCANE],
			"Razgrizmerc": [KRAGG],
			"Kantrip": [MAYPUL],
			"Dandy27": [],
			"TheEvets": [ZETTERBURN],
			"edgekid": [KRAGG],
			"Divinate": [ZETTERBURN],
			"MrMadPanda": [],
			"FilthyF": [],
			"Jackaraia": [ETALUS],
			"PK_Antifreeze": [],
			"Circa_Tandori": [MAYPUL],
			"Serious_Sarcasm": [ZETTERBURN],
			"iMadeATpyo": [WRASTOR],
			"voicecrak": [KRAGG],
			"Kintaeb": [],
			"Pandaaaa": [],
			"111MileS": [],
			"bluebak": [],
			"Bumblebomb": [KRAGG],
			"MrSplean": [WRASTOR],
			"TheBurntAlmond": [],
			"bobilombardi": [KRAGG],
			"Gourdon": [],
			"PePeTheMeme": [],
			"AgentEclair": [],
			"FH_Bicycle": [],
			"Joebobpickle": [ZETTERBURN],
			"Action_Hawk": [],
			"BuyOh": [],
			"AlienDinoScourge": [KRAGG],
			"Dudex11a": [],
			"TheBestAdamCarra": [MAYPUL],
			"CheesyPotato": [],
			"AetherMiNi": [],
			"MisterGuy24": [],
			"JuicyLemonZ": [],
			"Level100Caterpie": [],
			"Handbutt": [ETALUS],
			"TheCornbread": [],
			"Arete": [FORSBURN],
			"sneakysheik": [WRASTOR],
			"Melanin_Enriched": [],
			"MuffinThePancake": [],
			"Ishisan": [],
			"Lost_Echo": [],
			"Alfuh": [],
			"Warshi": [],
			"llamaq": [],
			"Beetlenator": [WRASTOR],
			"quuup": [ZETTERBURN],
			"Team_AEGIS": [],
			"tonterr": [],
			"WarMagic": [],
			"Willby": [],
			"puddinpud": [],
			"Bdoggy951": [],
			"flamingofarts": [],
			"Waver": [],
			"UnluckyMarksman": [],
			"controllerFreak14": [],
			"Zetternut": [ZETTERBURN],
			"HouseOfCremation": [FORSBURN, KRAGG],
			"Moosegone": [],
			"Rawin_STEAMNAME": [FORSBURN],
			"Raphaconcei": [ZETTERBURN],
			"DutchMyBoy": [],
			"TurtleBox": [],
			"RR_oso": [],
			"Renzo0": [],
			"Fickle_Hamper": [],
			"Cyrosity": [],
			"Goldie13": [],
			"Phrmxs": [ZETTERBURN],
			"cjt42": [],
			"Godbriel217": [],
			"VROOM99": [],
			"Lsaack": [],
			"dudeman876": [],
			"Kaarlitos": [],
			"ALoveSentinel": [],
			"WolFurious": [],
			"thelaffingman1": [],
			"Pray4U": [],
			"owlflame": [],
			"Stevenator546": [],
			"imteenyWeeny": [],
			"MLUjon": [],
			"Perceptus": [],
			"fridgebits": [],
			"Trushi": [],
			"Distraught_Ultra": [],
			"NinjaTank56": [ETALUS],
			"bravest222": [],
			"Galaedas": [],
			"Funnelcake5": [ORCANE],
			"frostsquirrel": [],
			"Namiel": [ZETTERBURN],
			"eygrr": [],
			"Smiile": [],
			"Piginabag": [ETALUS],
			"Voince": [ORCANE],
			"Shamyi": [],
			"godlydoge": [],
			"MegaBlissey": [],
			"MatthewMJV": [],
			"cory4g123": [],
			"Zaffhead": [],
			"JFMHunter": [ORCANE],
			"Dr_Grin": [],
			"LettuceDye": [ZETTERBURN],
			"Llama_Crusades": [],
			"Chujji": [],
			"Gizzybear": [ETALUS],
			"fungusmcgee": [],
			"saamman0": [],
			"Goldie27": [],
			"RickyRam": [],
			"Amixiaso": [],
			"MIDI_Vagrant": [],
			"Kevzor": [],
			"Thewispsoftime": [ZETTERBURN],
			"Dizzy_Pink": [ZETTERBURN],
			"rhinoflipper": [],
			"Bayspoon": [],
			"SuperCyclone": [],
			"xSir_Bagelx": [],
			"CaptainPatriarchy": [],
			"KurtsBalls": [],
			"Jwok": [],
			"StrangeAeons": [],
			"Maxi7": [],
			"xaneco333": [],
			"challenger44": [],
			"pef619": [],
			"Hebepep": [],
			"Rukinom": [],
			"Maromi_": [],
			"The_Dab_Daddy": [],
			"MarcusQuintus": [],
			"Coin_D2": [],
			"portalbob340": [],
			"BlacksmithMace": [],
			"DrDrudie": [],
			"dallydoodle": [],
			"MCarrot": [],
			"PlatformKing": [],
			"PrimeyPrime": [],
			"Gavant": [],
			"AdamTheDud": [],
			"Roxol": [],
			"xR_Fox": [],
			"Popkey": [],
			"daemonz": [],
			"Deven312": [],
			"OrangePledge": [],
			"FerociousPanda": [],
			"HyperActive1": [],
			"Spikeshade": [],
			"AbyssalMind": [],
			"littlewolf": [],
			"TEHHERO10": [],
			"jweeen": [],
			"toolless": [],
			"theboamba": [],
			"CyanShen": [ZETTERBURN],
			"Mtn64": [],
			"mr_temple": [],
			"PXshadow_": [],
			"PanicVis": [],
			"Rellling": [ETALUS],
			"Kynakid1": [],
			"fnarlee": [],
			"FistoFreak99": [],
			"Lushsmoke": [],
			"diux": [],
			"DiO_TH3K1L3R": [],
			"fantom1021": [],
			"solarDerivative": [],
			"Yoshiking13": [],
			"elicik": [],
			"Niipaah": [],
			"hyloang": [],
			"hexacorn": [],
			"cember": [],
			"junkmail22": [],
			"MisterTizye": [],
			"theGoSpeL": [],
			"epicnick7": [],
			"Laugh_": [],
			"activace": [],
			"TheMagicalCake": [],
			"akf09": [],
			"mmsanders": [],
			"shaZ_Man": [],
			"JustC4": [],
			"Katana_Bagel": [],
			"kamilchrzan": [],
			"PotatoJones": [],
			"Wobz": [],
			"YungTheCat": [],
			"Lunique": [],
			"Hawkman3210": [],
			"JUKE_SHAdes": [],
			"Etalus": [ETALUS],
			"Adwins": [],
			"Unseenvision": [],
			"Mix420": [],
			"JayroddCoolman": [],
			"samkostka": [],
			"TheSaltShaker": [FORSBURN],
			"SunWalker": [],
			"PGHjbro": []
	  });

	  const updates = [];

	  MAINS.forEach(function (value, key) {
			updates.push({challongeUsername: key, mains: value});
	  });

	  return Promise.map(updates, function (updateEntry) {
			return Player.update({challongeUsername: updateEntry.challongeUsername},
				  {mains: updateEntry.mains})
				  .then(function (records) {

				  });
	  });
};
