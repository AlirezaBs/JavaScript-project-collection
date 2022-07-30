// 1. Ask for account ✔️
// 2. If account does not exist ask to create account ✔️
// 3. Ask what they want to do ✔️
// 4. Execute command ✔️
//   a. View ✔️
//   b. Withdraw ✔️
//   c. Deposit ✔️

const Account = require("./Account")
const CommandLine = require("./CommandLine")

async function main() {
    try{   
        const accountName = await CommandLine.ask(
            "Which account woud you like to access?"
            )
            
            let account = await Account.find(accountName)
            if (account == null) account = await promptCreateAccount(accountName)
            if (account !== null) await promptTask(account)
        } catch(err){
            CommandLine.print('ERROR: Please try again!')
        }
        }

async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask(
    "That Account does not exist, Would you like to create it? (yes/no)"
  )

  if (response === "yes") {
    return await Account.create(accountName)
  }
}

async function promptTask(account) {
  const response = await CommandLine.ask(
    "What would you like to do? (view/deposit/withdraw)"
  )

  if (response === "deposit") {
    const amount = parseFloat(await CommandLine.ask("How much?"))
    await account.deposit(amount)
    CommandLine.print(`Your balance is ${account.balance}`)
  }

  if (response === "withdraw") {
    const amount = parseFloat(await CommandLine.ask("How much?"))
    try {
      await account.withdraw(amount)
    } catch (e) {
      CommandLine.print(
        "We were unable to make the withdraw, Please sure you have enough money in your account."
      )
    }
    CommandLine.print(`Your balance is ${account.balance}`)
  } else {
    CommandLine.print(`Your balance is ${account.balance}`)
  }
}

main()
