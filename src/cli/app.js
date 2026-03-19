#!/usr/bin/env node
// This file is to be run with Node.js
import dotenv from 'dotenv';

import { Command } from 'commander';
import { registerOrganizeCommand } from '../commands/organize.commands.js';

dotenv.config();

export const program = new Command();

program.name('photo-organizer').description('CLI for organizing photos').version('1.0.0');

registerOrganizeCommand(program);

program.parse();
