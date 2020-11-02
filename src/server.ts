import 'reflect-metadata';
import express from 'express';
import { App } from './app';
import { container } from './di';

const app = new App(
  container,
  express(),
);

app.listen();
