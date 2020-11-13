const PRIVATE_ACTIVE = process.env.private;

export default function({ store, redirect })
{
    
    if (PRIVATE_ACTIVE && (!store.state.user || !store.state.user.isAdmin))
    {
        return redirect('/admin/login');
    }
    else
    {
        
    }
}
