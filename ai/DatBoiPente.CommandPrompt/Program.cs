using System;
using System.Runtime.Remoting;
using System.Runtime.Serialization;
using DatBoiPente.Logic;
using DatBoiPente.Logic.Exceptions;

namespace DatBoiPente.CommandPrompt
{
	class MainClass
	{
		public static void Main(string[] args)
		{
			AI ai = new AI();

			while (!ai.Connected)
			{
				Console.WriteLine("Veuillez saisir l'addresse du serveur de jeu");
			    try
			    {
			        ai.Connect(Console.ReadLine());
			    }
			    catch (UriFormatException e) { Console.WriteLine("Le format de l'adresse est invalide"); }
			    catch (ServerException e) { Console.WriteLine("Le serveur choisi n'implement pas l'API du jeu"); }
                catch (Exception e) { Console.WriteLine("Une erreur s'est produite. Veuillez resaisir l'addresse du serveur de jeu");}
			}

		    try
		    {
		        ai.RequestGameConnection();
            }
            catch (SerializationException e) { Console.WriteLine("Deux joueurs sont deja connectes sur le serveur"); }
            catch (PlayerSlotsFullException e) {  Console.WriteLine("Deux joueurs sont deja connectes sur le serveur"); }

            ai.UpdateGameState();

            Console.ReadKey();
		}


	}
}
