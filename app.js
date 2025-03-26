let map;

function initMap() {
            // Centrer la carte sur Orléans
            const orleans = { lat: 47.9029, lng: 1.9092 };
            map = new google.maps.Map(document.getElementById("map"), {
                center: orleans,
                zoom: 14
            });

            // Charger les parkings
            fetchParkings();
        }        

function fetchParkings() {
            fetch("https://data.orleans-metropole.fr/api/explore/v2.1/catalog/datasets/disponibilite-parkings/records") // URL de l’API
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    data.results.forEach(parking => {
                        const position = {
                            lat: parking.geo_point_2d.lat,
                            lng: parking.geo_point_2d.lon
                        };

                        // Déterminer la couleur du marqueur en fonction des places disponibles
                        let color;
                        const tauxOccupation = parking.dispo / parking.total;
                        if (tauxOccupation > 0.5) color = "green";  // Beaucoup de places
                        else if (tauxOccupation > 0.2) color = "orange"; // Moyenne dispo
                        else color = "red"; // Presque plein

                        const marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            title: `${parking.nom} - Places disponibles: ${parking.dispo}`,
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                fillColor: color,
                                fillOpacity: 1,
                                scale: 8,
                                strokeColor: "white",
                                strokeWeight: 2
                            }
                        });

                        // Info-bulle au clic
                        const infoWindow = new google.maps.InfoWindow({
                            content: `<strong>${parking.nom}</strong><br>Places disponibles: ${parking.dispo} / ${parking.total}`
                        });

                        marker.addListener("click", () => {
                            infoWindow.open(map, marker);
                        });
                    });
                })
                .catch(error => console.error("Erreur lors de la récupération des données:", error));
        }        