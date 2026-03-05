const Profile = () => {
    return(
        <div>
            <h2 className="text-center">Profile Page</h2>
            <p className="text-center">This is the profile page. User details and settings will be displayed here.</p>
            <div className="flex mt-6">
                <aside className="w-1/4  p-4 bg-gray-200 rounded">
                    <ul className="space-y-2">
                        <li><a href="#" className="text-blue-500 hover:underline">Account Settings</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Order History</a></li>
                    </ul>
                </aside>
                <main className="w-3/4 pl-6">
                    <p>Profile content goes here</p>
                </main>
            </div>
        </div>        
    )
}

export default Profile