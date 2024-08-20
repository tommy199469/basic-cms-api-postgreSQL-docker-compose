import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "scan_results" })
export class ScanResult {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: ["Queued", "In Progress", "Success", "Failure"],
    default: "Queued",
  })
  status: "Queued" | "In Progress" | "Success" | "Failure";

  @Column({ name: "repository_name", type: "varchar", length: 255 })
  repositoryName: string;

  @Column({ type: "jsonb", default: [] })
  findings?: any;

  @Column({ name: "queued_at", type: "timestamp" })
  queuedAt: Date;

  @Column({ name: "scanning_at", type: "timestamp", nullable: true })
  scanningAt: Date;

  @Column({ name: "finished_at", type: "timestamp", nullable: true })
  finishedAt: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}
