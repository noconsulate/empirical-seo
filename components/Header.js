import Link from '../src/Link'

const Header = () => {
  return (
    <div>
      <Link href='/'>
        home
      </Link>
      <Link href='/about'>
        about
      </Link>
    </div>
  )
}

export default Header