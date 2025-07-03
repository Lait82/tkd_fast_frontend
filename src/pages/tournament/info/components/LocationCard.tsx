import { TournamentSchema } from "@/types/schemas/primitiveSchemas";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbBuildingStadium } from "react-icons/tb";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface LocationCardProps {
	tournament: TournamentSchema;
}

const LocationCard = ({ tournament }: LocationCardProps) => {
	return (
		<div className="flex flex-col gap-2 bg-elevated shadow-lg rounded-lg p-2">
			{/* Mapa */}
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-extrabold">📍 Ubicación</h1>
				<ul className="flex flex-col gap-1 text-lg font-semibold">
					<li className="flex items-center gap-1">
						<FaMapMarkerAlt
							className="text-neutrallight"
							size={30}
						/>{" "}
						{/* Direccion:{" "} */}
						{tournament.location ??
							"Callefalsa 123, Caballito, CABA"}
					</li>
					<li className="flex items-center gap-1">
						<TbBuildingStadium
							className="text-neutrallight"
							size={30}
						/>{" "}
						{/* Estadio:{" "} */}
						{tournament.arena ?? "Polideportivo Pedro Echagüe"}
					</li>
				</ul>
			</div>
			<div className="h-fit rounded-lg overflow-hidden relative z-0">
				<MapContainer
					center={[-34.641737, -58.468588]}
					zoom={13}
					style={{
						height: "400px",
						width: "100%",
					}}
				>
					<TileLayer
						attribution="&copy; OpenStreetMap"
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[-34.641737, -58.468588]}>
						<Popup>
							{tournament.arena ??
								`Polideportivo Pedro Echagüe. 
                                                    Callefalsa 123, Caballito, CABA`}
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		</div>
	);
};
export default LocationCard;
