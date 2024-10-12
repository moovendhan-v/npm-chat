"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Command_js_1 = __importDefault(require("../Command.js"));
const prisma = new client_1.PrismaClient();
class GroupCommand extends Command_js_1.default {
    constructor(groupId = null, name = null, adminIds = [], memberIds = []) {
        super();
        this.groupId = groupId; // Used for updates/deletes
        this.name = name; // Used for creation
        this.adminIds = adminIds;
        this.memberIds = memberIds;
    }
    ensureUsersExist(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUsers = yield prisma.user.findMany({
                where: {
                    id: { in: userIds },
                },
            });
            const existingUserIds = existingUsers.map(user => user.id);
            const missingUsers = userIds.filter(id => !existingUserIds.includes(id));
            if (missingUsers.length > 0) {
                const error = new Error(`Invalid user ids: ${missingUsers}, these users are not available in the database`);
                error.name = 'InvalidUserId';
                throw error;
            }
        });
    }
    ensureGroupExists() {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield prisma.group.findUnique({
                where: { id: this.groupId },
            });
            if (!group) {
                const error = new Error(`Group with ID ${this.groupId} does not exist`);
                error.name = 'NoGroupFound';
                throw error;
            }
        });
    }
    // Method to create a new group
    createGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Creating group with data", this.name, this.adminIds, this.memberIds);
            yield this.ensureUsersExist([...this.adminIds, ...this.memberIds]);
            const group = yield prisma.group.create({
                data: {
                    name: this.name,
                    admins: {
                        create: this.adminIds.map(adminId => ({
                            userId: adminId,
                        })),
                    },
                    members: {
                        create: this.memberIds.map(memberId => ({
                            userId: memberId,
                        })),
                    },
                },
            });
            return group;
        });
    }
    // Method to add members to an existing group
    addMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureGroupExists();
            yield this.ensureUsersExist(this.memberIds);
            const updatedGroup = yield prisma.group.update({
                where: { id: this.groupId },
                data: {
                    members: {
                        create: this.memberIds.map(memberId => ({
                            userId: memberId,
                        })),
                    },
                },
            });
            return updatedGroup;
        });
    }
    // Method to add admins to an existing group
    addAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureGroupExists();
            yield this.ensureUsersExist(this.adminIds);
            const updatedGroup = yield prisma.group.update({
                where: { id: this.groupId },
                data: {
                    admins: {
                        create: this.adminIds.map(adminId => ({
                            userId: adminId,
                        })),
                    },
                },
            });
            return updatedGroup;
        });
    }
    // Method to delete a group (and related records)
    deleteGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureGroupExists();
            yield prisma.groupAdmin.deleteMany({
                where: { groupId: this.groupId },
            });
            yield prisma.groupMember.deleteMany({
                where: { groupId: this.groupId },
            });
            yield prisma.group.delete({
                where: { id: this.groupId },
            });
            console.log(`Group with ID ${this.groupId} and all its related records have been deleted successfully.`);
        });
    }
}
exports.default = GroupCommand;
