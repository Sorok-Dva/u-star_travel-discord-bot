/** *****************************************************************************
 *  cmds/prune.ts
 *   _  _   ____      Author: Сорок два <sorokdva.developer@gmail.com>
 *  | || | |___ \
 *  | || |_  __) |                         Created: 2021/06/21 1:17 PM
 *  |__   _|/ __/                          Updated: 2021/06/22 11:52 PM
 *     |_| |_____|U*Travel
 /***************************************************************************** */
import { Message, TextChannel } from 'discord.js'
import { errors } from '../core'
import { CommandAccess } from '../helpers'

exports.run = async (
  message: Message,
  args: Array<string>,
): Promise<void> => {
  const accessAllowed = CommandAccess.checkPermission(message.author, 'admin', message)
  if (!accessAllowed) return

  try {
    const [num] = args
    const amount = Number.parseInt(num, 2) ?? 1
    const finalAmount = amount > 50 ? 50 : amount
    const channel = message.channel as TextChannel
    channel.bulkDelete(finalAmount).then(async () => {
      await channel
        .send(`*<@${message.author.id}>, ${finalAmount} messages ont été supprimés.*`)
        .then(msg => msg.delete({ timeout: 10000 }))
        .catch(err => errors.raiseReply(err, message))
    })
  } catch (e) {
    errors.raiseReply(e, message)
  }
}
