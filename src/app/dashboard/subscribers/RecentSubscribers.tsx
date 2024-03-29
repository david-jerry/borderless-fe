import { useAuth } from "@/hooks/useAuth";
import apiService from "@/services/apiService";
import { useEffect, useState } from "react"
import FormattedDate from "./FormattedDate";

const Activities: React.FC = () => {
    const auth = useAuth();
    const [activities, setActivities] = useState<Activities[]>([])

    useEffect(() => {
        const fetchActivities = async () => {
            const res = await apiService.get(`/activities/`, auth!.accessToken)
            console.log(res)
            if (res.error_message === "Authentication credentials were not provided.") {
                await auth!.rfreshToken(auth!.refreshToken!)
                fetchActivities();
            }
            setActivities(res.results)
        }

        if (auth !== null && auth.accessToken !== undefined) {
            fetchActivities();

            // Optionally, you can set up a timer to fetch data periodically
            const intervalId = setInterval(fetchActivities, 60000); // Fetch data every minute

            // Clean up function to clear the interval when the component unmounts
            return () => clearInterval(intervalId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    // Get the current date
    const currentDate = new Date();

    // Calculate the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    // Filter users based on whether they joined recently or not
    const recentUsers = activities.filter(user => new Date(user.created) > sevenDaysAgo);
    const past7DaysUsers = activities.filter(user => new Date(user.created) <= sevenDaysAgo);

    return (
        <div className="h-full overflow-y-auto w-full">
            <h2>Recently Joined</h2>
            <div className="min-h-40 pt-4 space-y-2 flex flex-col items-start text-gray-500 w-full">

                {recentUsers.length > 0 ? (recentUsers.map(user => (
                    <div key={user.id} className="flex items-center w-full justify-between border-t first-of-type:border-t-0 pt-2.5">
                        <div className="flex flex-col items-start space-y-1 w-full">

                            <span className="text-xs font-bold flex w-fit whitespace-nobreak truncate">{user.identity}</span>
                            <span className="text-xs flex w-fit whitespace-nobreak truncate">{user.activity_type}</span>
                            {/* Other user details */}

                        </div>
                        <div className="text-xs flex items-end w-full text-right whitespace-nowrap">
                            <FormattedDate datestring={user.created} />
                        </div>
                    </div>
                ))) : (
                    <span className="font-semibold text-sm">No Recent Activity</span>
                )}
            </div>
            <h2 className="pt-6">Older Activities</h2>
            <div className="pt-4 space-y-2 flex flex-col items-start text-gray-500">
                {past7DaysUsers.length > 0 ? (past7DaysUsers.map(user => (
                    <div key={user.id} className="flex items-center w-full justify-between border-t first-of-type:border-t-0 pt-2.5">
                        <div className="flex flex-col items-start space-y-1 w-full">

                            <span className="text-xs font-bold flex w-fit whitespace-nobreak truncate">{user.identity}</span>
                            <span className="text-xs flex w-fit whitespace-nobreak truncate">{user.activity_type}</span>
                            {/* Other user details */}

                        </div>
                        <div className="text-xs flex items-end w-full text-right whitespace-nowrap">
                            <FormattedDate datestring={user.created} />
                        </div>
                    </div>
                ))) : (
                    <span className="font-semibold text-sm">No Older Activity</span>
                )}
            </div>
        </div>
    );
}

export default Activities;