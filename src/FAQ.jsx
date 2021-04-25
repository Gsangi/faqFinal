import Box               from '@material-ui/core/Box'
import { makeStyles }    from '@material-ui/core'
import Grid              from '@material-ui/core/Grid'
import Container         from '@material-ui/core/Container'
import Typography        from '@material-ui/core/Typography'
import IconButton        from '@material-ui/core/IconButton'
import SearchIcon        from '@material-ui/icons/Search'
import Autocomplete      from '@material-ui/lab/Autocomplete'
import TextField         from '@material-ui/core/TextField'
import Button            from '@material-ui/core/Button'
import Dialog            from '@material-ui/core/Dialog'
import DialogActions     from '@material-ui/core/DialogActions'
import DialogContent     from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle       from '@material-ui/core/DialogTitle'
import Card              from '@material-ui/core/Card'
import CardContent       from '@material-ui/core/CardContent'
import { useState }      from 'react'
import React, { useRef } from 'react'

const useStyles = makeStyles((theme) => ({
    root      : {
        margin: 0,
    },
    search    : {
        padding   : '2px 4px',
        display   : 'flex',
        alignItems: 'center',
        width     : 400,
    },
    input     : {
        marginLeft: theme.spacing(1),
        flex      : 1,
    },
    iconButton: {
        padding: 10,
    },
    faq       : {
        minWidth: 275,
    },
    bullet    : {
        display  : 'inline-block',
        margin   : '0 2px',
        transform: 'scale(0.8)',
    },
    title     : {
        fontSize: 14,
    },
    pos       : {
        marginBottom: 12,
    },
}))

export default function FAQ () {
    const classes = useStyles()
    const searchRef = useRef()
    const [open, setOpen] = useState(false)
    const [que, setQue] = useState()

    const handleClose = () => {
        setQue()
        setOpen(false)
    }

    const handleAutocompleteSelect = (event, value) => {
        console.log(value)
        setQue(value)
        setOpen(true)
    }

    return (<Container>
        <Grid container>
            <Grid item xs={12} container justify="center">
                <Typography variant="h3" gutterBottom>
                    FAQs
                </Typography>
            </Grid>
            <Grid item xs={12} container justify="center">
                <Autocomplete
                    onChange={handleAutocompleteSelect}
                    options={ques}
                    getOptionLabel={(option) => option.que}
                    className={classes.search}
                    renderInput={(params) => <TextField {...params}
                                                        label="Frequently asked questions..."
                                                        inputRef={searchRef}
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    <IconButton
                                                                        type="submit"
                                                                        className={classes.iconButton}
                                                                        aria-label="search">
                                                                        <SearchIcon/>
                                                                    </IconButton>
                                                                    {params.InputProps.endAdornment}
                                                                </React.Fragment>),
                                                        }}/>}
                />
            </Grid>
            <Grid item xs={12} container justify="center" component={Box}
                  mt={1}>
                {ques.map(q => q.id < 3 &&
                               (<Grid key={q.id} item xs={12} sm={6} container
                                      justify="center" component={Box} p={3}>
                                   <Card className={classes.faq}
                                         variant="outlined">
                                       <CardContent>
                                           <Typography className={classes.title}
                                                       color="textSecondary"
                                                       gutterBottom>
                                               {q.ans[0].from}
                                           </Typography>
                                           <Typography variant="h5"
                                                       component="h2">
                                               {q.que}
                                           </Typography>
                                           <Typography variant="body2"
                                                       component="p">
                                               {q.ans[0].replay}
                                           </Typography>
                                       </CardContent>
                                   </Card>
                               </Grid>))}
            </Grid>
        </Grid>
        {que ? <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{que.que}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {que.ans[0].replay}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog> : null}
    </Container>)
}

const ques = [
    {
        id : 1,
        que: 'How to do Lorem ipsum dolor',
        ans: [
            {
                from  : 'Staff',
                replay: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
        ],
    }, {
        id : 2,
        que: 'My Lorem ipsum dolor sit amet not working',
        ans: [
            {
                from  : 'Staff',
                replay: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
        ],
    }, {
        id : 3,
        que: 'Lorem ipsum dolor sit amet is crashing',
        ans: [
            {
                from  : 'Staff',
                replay: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
        ],
    }, {
        id : 4,
        que: 'Why do I use Lorem ipsum dolor',
        ans: [
            {
                from  : 'Staff',
                replay: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
        ],
    }, {
        id : 5,
        que: 'Lorem ipsum dolor sit amet is bad',
        ans: [
            {
                from  : 'Staff',
                replay: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
            },
        ],
    },
]
