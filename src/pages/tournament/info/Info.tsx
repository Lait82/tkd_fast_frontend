"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoBack from "@/components/GoBack";
import "@/styles/EditTournament.css";
import TournamentNavbar from "@/components/TournamentNavbar";
import LocationCard from "./components/LocationCard";
import OrganizationCard from "./components/OrganizationCard";
import Banner from "./components/Banner";
import { useTournamentStore } from "@/states/useTournamentStore";

// Mock data for tournaments
const Info = () => {
	// const { user } = useAuth();
	// const [codeValue, setCodeValue] = useState<string>('');
	// const [loading, setLoading] = useState<boolean>()
	const { tournament } = useTournamentStore();
	return (
		<div className="create-tournament-page">
			<Header />

			<main className="create-tournament-container">
				<div className="grid grid-cols-3 items-center">
					<GoBack />
					<div className="flex justify-center w-ful">
						<TournamentNavbar />
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Banner tournament={tournament} />

					{/* Description and info container */}
					<div className="grid w-full grid-cols-3 gap-2">
						<div className="bg-elevated col-span-2 p-3 rounded-lg shadow-lg ">
							<h1 className="text-2xl font-extrabold mb-3">
								Descripción
							</h1>
							<p className="leading-3 text-xl">
								{tournament.description ??
									`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur et enim eu mollis. Praesent pellentesque vitae nulla rhoncus faucibus. Suspendisse ut varius mi. Donec dignissim, metus nec bibendum elementum, nulla metus sagittis leo, in commodo elit enim eget nunc. Ut quis leo sed enim dictum condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam a turpis orci. Etiam auctor efficitur tempus. Morbi lectus neque, mattis a sem cursus, mollis cursus sapien. Sed sit amet convallis libero. Etiam et convallis nibh. Pellentesque auctor eu ex at commodo. Vivamus molestie commodo elementum. Praesent at ipsum vel eros rutrum pretium. Cras quis dui nec nunc scelerisque laoreet eget eu massa. Donec convallis, turpis a tristique rhoncus, justo dolor auctor turpis, at porta dui ligula eu metus. Aliquam erat volutpat. Duis rutrum tristique gravida. Phasellus dictum nec elit ut molestie. In gravida sem non ante tristique convallis. Suspendisse eu urna sit amet justo sodales rhoncus. Donec malesuada diam eu sollicitudin iaculis. Donec ac mauris ut ex egestas porta. Vivamus auctor ut justo ac vulputate. Vivamus porta nisl eu magna bibendum eleifend. Cras vitae blandit est, non fermentum nulla. Proin suscipit fringilla dolor. Duis vitae aliquam sapien. Nunc varius ipsum erat, et faucibus enim volutpat at. Cras bibendum interdum dapibus. Sed commodo vitae mauris in luctus. Aenean quis commodo turpis. Vestibulum ullamcorper augue in sodales gravida. Mauris commodo accumsan lectus pulvinar finibus. Nam laoreet nisi ante, id sodales metus blandit rutrum. Nullam hendrerit erat nec tortor volutpat finibus dignissim a lacus. In id augue malesuada felis gravida bibendum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque tellus lorem, cursus quis tellus vitae, iaculis faucibus felis. Nulla enim odio, commodo ut justo at, maximus lobortis ex. Ut laoreet id justo vitae rutrum. Ut in efficitur odio, a tempus mauris. Pellentesque et nisi dictum, gravida nisi vitae, vestibulum felis. Aenean laoreet orci eget velit accumsan faucibus. Nulla accumsan, quam ultricies cursus elementum, odio ante egestas sapien, vel placerat urna nisl in quam. Nullam ultrices felis eu elementum ultrices. Duis lacus nibh, eleifend ut faucibus sit amet, mollis at turpis. Ut sapien augue, aliquet ut augue a, cursus accumsan lacus. Morbi lorem quam, laoreet a ex consectetur, varius blandit orci. Aliquam luctus, diam ac porttitor maximus, ante neque bibendum lectus, et sollicitudin augue purus id metus. Etiam gravida tristique molestie. Sed ut posuere enim. In mollis tristique ex nec eleifend. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec est tortor, gravida et libero vitae, venenatis porttitor magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla non suscipit elit.`}
							</p>
						</div>

						{/* Side Cards */}
						<div className="flex flex-col gap-2">
							<OrganizationCard tournament={tournament} />
							<LocationCard tournament={tournament} />
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Info;
