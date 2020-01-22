import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Survey = props => {

  return (
    <div>
      <Typography variant='h3'>
        Empirical SEO
      </Typography>
      <Typography variant='body'>
        you see a turtle on the beach, upside down. you decide you want a tomagachi. what do?
      </Typography>
      <form noValidate autoComplete='off'>
        <TextField label='keywords' /> <br />
        <Button variant='contained'>submit</Button>
      </form>
    </div>
  )
}

export default Survey