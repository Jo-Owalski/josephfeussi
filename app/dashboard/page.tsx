import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "../utils/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import BlogPostCard from "@/components/general/BlogPostCard"

async function getData (userId: string | undefined){ // Update type to handle undefined
  if (!userId) {
    return []; // Return an empty array immediately if no userId
  }
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    }
  })
  return data;
}

const DashBoard = async ()=> {
   
  const {getUser} = getKindeServerSession();
  const user =  await getUser();
  const data =  await getData(user?.id) ;

  return (
    <>
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link href="/dashboard/create" className={buttonVariants()}>Create Post</Link> 
    </div>
    {data.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {data.map((item) => (
          <BlogPostCard data={item} key={item.id} />
        ))}
      </div>
    ) : (
      <div className="text-center py-20">
        <p className="text-gray-500">You have no blog posts yet.</p>
        <p className="text-gray-500">Click "Create Post" to write your first one!</p>
      </div>
    )}
    </>
  )
}

export default DashBoard