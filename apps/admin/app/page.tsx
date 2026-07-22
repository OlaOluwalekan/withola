import { prisma } from '@repo/database'

const HomePage = async () => {
  const users = await prisma.user.findMany({})

  console.log('Test ==>', users)

  return <div>Admin</div>
}

export default HomePage
