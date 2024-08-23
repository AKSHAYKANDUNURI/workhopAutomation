import React, { useContext } from 'react';
import { WorkshopContext } from '../Context/workshopContext';
import WorkshopCardStudent from '../WorkshopCardStudent/WorkshopCardStudent'

function WorkshopList() {
    const { data } = useContext(WorkshopContext);

    const isUpcomingWorkshop = (workshop) => {
        const workshopDateTime = new Date(`${workshop.workshopDate}T${workshop.workshoptime}`);
        const now = new Date();
        return workshopDateTime > now;
    };

    const upcomingWorkshops = data.filter(isUpcomingWorkshop);

    return (

            <div className="cardBundle">
                {upcomingWorkshops.length > 0 ? (
                upcomingWorkshops.map((item, index) => (
                    <div key={index} className="cardContainer">
                            <WorkshopCardStudent item={item} />
                        </div>
                ))
            ) : (
                <p>No upcoming workshops found.</p>
            )}
        </div>
    );
}

export default WorkshopList;
